package com.Ukkyeongjo.main;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpClient;

public class Verticle extends AbstractVerticle {
	@Override
	public void start() throws Exception {
		HttpClient client = vertx.createHttpClient();

		client.websocket(8080, "localhost", "/some-uri", websocket -> {
			websocket.handler(data -> {
				System.out.println("Received data " + data.toString("ISO-8859-1"));
				client.close();
			});
			websocket.writeBinaryMessage(Buffer.buffer("Hello world"));
		});
	}
}
