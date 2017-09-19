package com.Ukkyeongjo.main;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import io.netty.handler.codec.http.HttpResponse;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;

import java.sql.*;

public class Server {
	static Vertx vertx = null;

	public static void main(String[] args) {
		DB.connect();
		DB.create();     
		startServer("main", vertx);
	}

	// 서버 켜기
	public static void startServer(String str, Vertx vertxArg) {
		System.out.println("Server is started by " + str);
		vertx = vertxArg;
		if(vertx == null)	{
			vertx = Vertx.vertx();
		}
		
		Router router = Router.router(vertx);
		
		router.route().handler(BodyHandler.create());
		
		// Static 파일 핸들러
		router.route("/static/*").handler(StaticHandler.create("../front/"));
		
		// 메인페이지 라우팅
		router.get("/").handler(ctx -> {
			HttpServerResponse response = ctx.response();
			  
			response.sendFile("../front/main_page.html");
		});
		
		router.post("/register").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			JsonObject json = ctx.getBodyAsJson();
			String tId = json.getString("id");
			String tPw = json.getString("pw");
			String tRePw = json.getString("re-pw");
			if(!tPw.equals(tRePw)) {
				res.setStatusCode(400).setStatusMessage("It is not same").end();
			} else {
				String sql = "INSERT INTO USERS(ID,PW) VALUES('" + tId + "','" + tPw + "');";
				
				System.out.println("ID : " + tId);
				System.out.println("PW : " + tPw);
				
				try {
					DB.statement.executeUpdate(sql);
				} catch (SQLException e) {
					res.setStatusCode(400).setStatusMessage("Register Failed").end();
				}
				res.end();
			}
		});
		
		router.post("/login").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			JsonObject json = ctx.getBodyAsJson();
			
			String tId = json.getString("id");
			String tPw = json.getString("pw");
			
			String sql = "SELECT * FROM USERS WHERE ID = ? AND PW = ?";
			PreparedStatement pstmt;
			try {
				pstmt = DB.conn.prepareStatement(sql);

				pstmt.setString(1,tId);
				pstmt.setString(2, tPw);

				ResultSet rs = pstmt.executeQuery();

				System.out.println(rs.getString("ID"));
			} catch (SQLException e) {
				System.out.println("로그인 실패");
				res.setStatusCode(400).end();
			}
			res.setStatusCode(200).end();
		});
		
		// 포트 8080
		vertx.createHttpServer().requestHandler(router::accept).listen(8080);

		// 웹소켓 핸들러
		vertx.createHttpServer().websocketHandler(new CustomWebsocketHandler()).listen(8090);
	}
}

