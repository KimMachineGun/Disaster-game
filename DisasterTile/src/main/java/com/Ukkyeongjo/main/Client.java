package com.Ukkyeongjo.main;

import io.vertx.core.Vertx;

public class Client {
	// Convenience method so you can run it in your IDE
	public static void main(String[] args) {
		Runner.runExample(Client.class);
		Vertx vertx = Vertx.vertx();
		vertx.deployVerticle(new Verticle());
	}
}
