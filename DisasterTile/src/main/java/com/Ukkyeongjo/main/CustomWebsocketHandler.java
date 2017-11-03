package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TimerTask;
import java.util.Timer;

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
	static int cnt = 0;
	
	public void multicast(Map<String, ServerWebSocket> sessions, JsonObject data) {
		Set<String> keySet = sessions.keySet();
		Iterator<String> keySetIt = keySet.iterator();
		while(keySetIt.hasNext()) {
			String key = keySetIt.next();
			sessions.get(key).writeTextMessage(data.toString());
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
					System.out.println(data.toString());
					JsonObject reqData = new JsonObject(data.toString());
					JsonObject resData = new JsonObject();
					
					System.out.println(reqData.getString("status"));
					
					if(reqData.getString("status").equals("matching")) {
						if(game == null) {
							// 매칭 로직
							if(gameSessions.size() < 4) {
								gameSessions.put(ws.textHandlerID(), ws);
								System.out.println(ws.textHandlerID());
								System.out.println(gameSessions.size());
								if(gameSessions.size() == 4) {
									game = new Game();
									
									try {
										Thread.sleep(5000);
									} catch (InterruptedException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}
									
									resData.put("status", "matched");
									
									multicast(gameSessions, resData);
									
									gameSessions.clear();
								} else {
									resData.put("status", "loading");
									ws.writeTextMessage(resData.toString());
								}
							} else {
								resData.put("status", "full");
								ws.writeTextMessage(resData.toString());
							}
						} else {
							resData.put("status", "exist");
							ws.writeTextMessage(resData.toString());
						}						
					} else if(reqData.getString("status").equals("in-game")) {
						resData.put("status", "in-game");
						// 인게임 통신
						if(reqData.getString("code").equals("end")) {
							// 턴 종료 로직
							game.playerControl(reqData.getInteger("id").intValue(), reqData.getBoolean("isItemUsed").booleanValue());
							
						} else if(reqData.getString("code").equals("sendMove")) {
							// 실시간 움직임
							System.out.println(reqData.toString());
							game.setPlayerPosition(reqData.getInteger("x").intValue(), reqData.getInteger("y").intValue(), reqData.getInteger("id").intValue(), reqData.getInteger("item").intValue());
							resData.put("code", "receiveMove");
							JsonArray resArray = new JsonArray();
							for(int i = 0; i < game.player.length; i++) {
								JsonObject temp = new JsonObject();
								temp.put("id", i);
								temp.put("x", game.player[i].x);
								temp.put("y", game.player[i].y);
								resArray.add(temp);
							}
							resData.put("positions", resArray);
							multicast(gameSessions, resData);
							
						} else if(reqData.getString("code").equals("connected")) {
							Timer jobScheduler = new Timer();
							gameSessions.put(String.valueOf(cnt), ws);

							game.player[cnt] = new Player(cnt, cnt);
							
							resData.put("code", "init");
							resData.put("id", cnt);
							game.player[cnt].id = cnt;
							cnt++;
							
							ws.writeTextMessage(resData.toString());
							if(cnt == game.player.length) {
								jobScheduler.scheduleAtFixedRate(new Turn(gameSessions, game), 0, 1000);								
								cnt = 0;								
							}
						}
					} else {
						// 잘못된 요청 차단
						resData.put("status", "wrong");
						ws.writeTextMessage(resData.toString());
					}
				}
			});
		}
	}
}

class Turn extends TimerTask {
	static int cnt = 10;
	Map<String, ServerWebSocket> gameSessions;
	Game game;
	
	public Turn(Map<String, ServerWebSocket> gamesess, Game game) {
		this.gameSessions = gamesess;
		this.game = game;
	}
	
	public void run() {
		JsonObject data = new JsonObject();
		
		if(cnt == -2) {
			cnt = 10;
			
			game.generateDisaster(1);
			game.generateItem();
			
			JsonArray disasterArr = new JsonArray();
			
			for(int i = 0; i < game.disasters.length; i ++) {
				JsonArray temp = new JsonArray();
				for(int j = 0; j < game.disasters[i].length; j++) {
					temp.add(game.disasters[i][j]);
				}
				disasterArr.add(temp);
			}
			
			JsonArray itemArr = new JsonArray();
			
			for(int i = 0; i < game.items.length; i++) {
				JsonArray temp = new JsonArray();
				for(int j = 0; j < game.items[i].length; j++) {
					temp.add(game.items[i][j]);
				}
				itemArr.add(temp);
			}
			
			data.put("disaster", disasterArr);
			data.put("item", itemArr);
		};
		
		data.put("status", "in-game");
		data.put("code", "time");
		data.put("time", cnt--);
		
		Set<String> keySet = gameSessions.keySet();
		Iterator<String> keySetIt = keySet.iterator();
		while(keySetIt.hasNext()) {
			String key = keySetIt.next();
			gameSessions.get(key).writeTextMessage(data.toString());
		}
	}
}