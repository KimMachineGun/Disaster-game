package com.Ukkyeongjo.main;

import io.vertx.core.Vertx;

public class Server {
	public static void main(String[] args) {
		Runner.runExample(Server.class);
		Vertx vertx = Vertx.vertx();
		vertx.deployVerticle(new ServerVerticle());
	}
}
