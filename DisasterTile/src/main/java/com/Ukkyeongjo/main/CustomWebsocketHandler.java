package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

class CustomWebsocketHandler<E> implements Handler<E> {
	Vertx vertx = Server.vertx;
	static Map<String, ServerWebSocket> wsSessions = new HashMap<String, ServerWebSocket>();
	static Map<String, ServerWebSocket> gameSessions = new HashMap<String, ServerWebSocket>();
	static Game game;
	
	public void broadcast(JsonObject data) {
		Set<String> keySet = wsSessions.keySet();
		Iterator<String> keySetIt = keySet.iterator();
		while(keySetIt.hasNext()) {
			String key = keySetIt.next();
			wsSessions.get(key).write(data.toBuffer());
		}
	}
	
	public void multicast(JsonObject data) {
		Set<String> keySet = gameSessions.keySet();
		Iterator<String> keySetIt = keySet.iterator();
		while(keySetIt.hasNext()) {
			String key = keySetIt.next();
			gameSessions.get(key).write(data.toBuffer());
		}
	}
	
	@Override
	public void handle(E wsArg) {
		ServerWebSocket ws = (ServerWebSocket)wsArg;
		
		if (!ws.path().equals("/game-ws")) {
			ws.reject();
			return;
			
		} else {
			wsSessions.put(ws.textHandlerID(), ws);
			
			ws.closeHandler(ch -> {
				System.out.println("closing : " + ws.textHandlerID());
				wsSessions.remove(ws.textHandlerID());
				gameSessions.remove(ws.textHandlerID());
			});
	
			ws.handler(new Handler<Buffer>() {
				@Override
				public void handle(final Buffer data) {
					JsonObject reqData = new JsonObject(data);
					JsonObject resData = new JsonObject();
					
					if(reqData.getString("status").equals("matching")) {
						// 매칭 로직
						if(gameSessions.size() < 4) {
							gameSessions.put(ws.textHandlerID(), ws);
							if(gameSessions.size() == 4) {
								game = new Game();
								game.player[0] = new Player();
								game.player[1] = new Player();
								game.player[2] = new Player();
								game.player[3] = new Player();
								
								Set<String> keySet = gameSessions.keySet();
								Iterator<String> keySetIt = keySet.iterator();
								int i = 0;
								while(keySetIt.hasNext()) {
									JsonObject temp = new JsonObject();
									temp.put("status", "init");
									temp.put("id", i++);
									String key = keySetIt.next();
									gameSessions.get(key).write(temp.toBuffer());
								}
							}
						} else {
							resData.put("status", "full");
							ws.write(resData.toBuffer());
						}
					} else if(reqData.getString("status").equals("in-game")) {
						resData.put("status", "in-game");
						// 인게임 통신
						if(reqData.getString("code").equals("end")) {
							// 턴 종료 로직
							game.playerControl(game.player[reqData.getInteger("id").intValue()].x, game.player[reqData.getInteger("id").intValue()].y, reqData.getInteger("id").intValue(), reqData.getBoolean("isItemUsed").booleanValue());
		
						} else if(reqData.getString("code").equals("sendMove")) {
							// 실시간 움직임
							game.setPlayerPosition(reqData.getInteger("x").intValue(), reqData.getInteger("y").intValue(), reqData.getInteger("id").intValue(), reqData.getInteger("item").intValue());
							resData.put("code", "receiveMove");
							JsonArray resArray = new JsonArray();
							for(int i = 0; i < 4; i++) {
								JsonObject temp = new JsonObject();
								temp.put("id", i);
								temp.put("x", game.player[i].x);
								temp.put("y", game.player[i].y);
								resArray.add(temp);
							}
							resData.put("postions", resArray);
							multicast(resData);
						}
					} else {
						// 잘못된 요청 차단
						resData.put("status", "wrong");
						ws.write(resData.toBuffer());
					}
					
				}
			});
		}
		
	}
	
}