package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

import java.sql.*;

public class Server {
	static Vertx vertx = null;
	
	public void start() {
		startServer("start", vertx);
	}

	public static void main(String[] args) {
		DB.connect();
		//DB.create();     
		startServer("main", vertx);
	}

	public static void startServer(String str, Vertx vertxArg) {
		System.out.println("Server is started by " + str);
		vertx = vertxArg;
		if(vertx == null)	{
			vertx = Vertx.vertx();
		}
		Router router = Router.router(vertx);
		
		router.route("/static/*").handler(StaticHandler.create("../front/"));
		
		router.get("/").handler(ctx -> {
			HttpServerResponse response = ctx.response();
			  
			response.sendFile("../front/login_page.html");
		});
		

		
		vertx.createHttpServer().requestHandler(router::accept).listen(8080);

		vertx.createHttpServer().websocketHandler(new CustomWebsocketHandler()).listen(8090);
	}
}

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