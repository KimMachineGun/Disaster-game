package com.Ukkyeongjo.main;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpClient;

public class Client extends AbstractVerticle {

  // Convenience method so you can run it in your IDE
  public static void main(String[] args) {
    Runner.runExample(Client.class);
  }

  @Override
  public void start() throws Exception {
    HttpClient client = vertx.createHttpClient();

    client.websocket(8080, "localhost", "/ws-game", websocket -> {
      websocket.handler(data -> {
        System.out.println("Received data " + data.toString("ISO-8859-1"));
        client.close();
      });
      websocket.writeBinaryMessage(Buffer.buffer("Hello worlddsaf"));
    });
  }
}