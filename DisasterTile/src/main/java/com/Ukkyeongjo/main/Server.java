package com.Ukkyeongjo.main;


import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.*;
import io.vertx.core.AbstractVerticle;

public class ServerVerticle extends AbstractVerticle {

	@Override
	public void start() {

		vertx.createHttpServer().requestHandler(req -> {
			if (req.uri().equals("/")) {
				req.response().sendFile("src/templates/index.html");
			}
		}).listen(8080, "localhost");

		vertx.createHttpServer().websocketHandler(new Handler<ServerWebSocket>() {
			@Override
			public void handle(final ServerWebSocket ws) {
				if (!ws.path().equals("/game-ws")) {
					ws.reject();
					return;
				}

				ws.closeHandler(new Handler<Void>() {
					@Override
					public void handle(final Void event) {
						System.out.println("종료");
					}
				});
				
				ws.handler(new Handler<Buffer>() {
					@Override
					public void handle(final Buffer data) {
						System.out.println(data);
						ws.writeTextMessage(data + " 가 서버에 도착했데요~");
					}
				});

			}
		}).listen(8090);
	}
}