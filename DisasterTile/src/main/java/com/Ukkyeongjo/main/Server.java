package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.ServerWebSocket;

public class Server {
	static Vertx vertx = null;
	
	public void start() {
		startServer("start", vertx);
	}

	public static void main(String[] args) {
		Runner.runExample(Server.class);
		startServer("main", vertx);
	}

	public static void startServer(String str, Vertx vertxArg) {
		System.out.println("Server is started by " + str);
		vertx = vertxArg;
		if(vertx == null)	{
			vertx = Vertx.vertx();
		}
		vertx.createHttpServer().requestHandler(req -> {
			if (req.uri().equals("/")) {
				req.response().sendFile("src/templates/index.html");
			}
		}).listen(8080);

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
					System.out.println(data);
					// ws.writeFinalTextFrame(data + " 가 서버에 도착했데요~");
//					Buffer a = Buffer.buffer();
//					
//					a.appendBuffer(data);

					Set<String> keySet = wsSessions.keySet();
					Iterator<String> keySetIt = keySet.iterator();
					while(keySetIt.hasNext()) {
						String temp = keySetIt.next();
						System.out.println("data 전송");
						wsSessions.get(temp).writeTextMessage(data + "가 서버에 도착");
					}
				}
			});
		}
		
	}
	
}