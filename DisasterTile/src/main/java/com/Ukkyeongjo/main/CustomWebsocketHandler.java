package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.ServerWebSocket;

class CustomWebsocketHandler<E> implements Handler<E> {
	Vertx vertx = Server.vertx;
	static Map<String, ServerWebSocket> wsSessions = new HashMap<String, ServerWebSocket>();
	
	@Override
	public void handle(E arg0) {
		ServerWebSocket ws = (ServerWebSocket) arg0;
		if (!ws.path().equals("/game-ws")) {
			ws.reject();
			return;
		} else {
			wsSessions.put(ws.textHandlerID(), ws);
			
			ws.closeHandler(ch -> {
				System.out.println("closing : " + ws.textHandlerID());
				wsSessions.remove(ws.textHandlerID());
			});
	
			ws.handler(new Handler<Buffer>() {
				@Override
				public void handle(final Buffer data) {
					String temp = data.toString();
//					ResultSet rs = DB.executeQuery(temp);
//					
//					try {
//						while(true) {
//							if(rs.next()) {
//								System.out.println(rs.getString(1) + " " + rs.getString(2) + " " + rs.getString(3));
//							} else {
//								break;
//							}
//						}
//						
//					} catch (SQLException e) {
//						e.printStackTrace();
//					}
					
					Set<String> keySet = wsSessions.keySet();
					Iterator<String> keySetIt = keySet.iterator();
					while(keySetIt.hasNext()) {
						String key = keySetIt.next();
						wsSessions.get(key).writeTextMessage(data + "가 서버에 도착");
					}
				}
			});
		}
		
	}
	
}