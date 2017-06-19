package com.Ukkyeongjo.main;

import io.vertx.core.AbstractVerticle;

public class ServerVerticle extends AbstractVerticle {
	@Override
	public void start() throws Exception {
	    vertx.createHttpServer().websocketHandler(ws -> ws.handler(ws::writeBinaryMessage)).requestHandler(req -> {
	        if (req.uri().equals("/")) req.response().sendFile("ws.html");
	    }).listen(8080);
	}
}
