package com.Ukkyeongjo.main;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.Session;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;

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
	    router.route().handler(CookieHandler.create());
	    router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
		
		// Static 파일 핸들러
		router.route("/static/*").handler(StaticHandler.create("../front/"));
		
		// 메인페이지 라우팅
		router.get("/").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			res.sendFile("../front/main_page.html");
		});
		
		router.post("/register").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			JsonObject json = ctx.getBodyAsJson();
			String tId = json.getString("id");
			String tPw = json.getString("pw");
			String tRePw = json.getString("re-pw");
			if(!tPw.equals(tRePw)) {
				res.setStatusCode(400).setStatusMessage("It's not same").end();
			} else {
				String sql = "INSERT INTO USERS(ID,PW) VALUES('" + tId + "','" + tPw + "');";
				try {
					DB.statement.executeUpdate(sql);
					System.out.println("REGISTER SUCCESS : " + tId);
					res.setStatusCode(200).end();
				} catch (SQLException e) {
					System.out.println("REGISTER FAILED");
					res.setStatusCode(400).setStatusMessage("Register Failed").end();
				}
			}
		});
		
		router.post("/login").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			Session session = ctx.session();
			JsonObject json = ctx.getBodyAsJson();
			
			String tId = json.getString("id");
			String tPw = json.getString("pw");
			
			String sql = "SELECT * FROM USERS WHERE ID = ? AND PW = ?";
			PreparedStatement pstmt;
			try {
				pstmt = DB.conn.prepareStatement(sql);

				pstmt.setString(1, tId);
				pstmt.setString(2, tPw);

				ResultSet rs = pstmt.executeQuery();

				System.out.println("LOGIN SUCEESS : " + rs.getString("ID"));

				session.put("user", tId);
				res.setStatusCode(200).end();
			} catch (SQLException e) {
				System.out.println("LOGIN FAILED");
				res.setStatusCode(400).end();
			}
		});
		
		router.get("/logout").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			Session session = ctx.session();
			
			if(session.data().containsKey("user") == true) {
				session.remove("user");
				res.setStatusCode(200).end();
			} else {
				res.setStatusCode(400).end();
			}
			
		});
		
		router.get("/session").handler(ctx -> {
			HttpServerResponse res = ctx.response();
			Session session = ctx.session();
			
			if(session.data().containsKey("user") == true) {
				System.out.println("USER ID : " + session.get("user").toString());
				res.setStatusCode(200).end();
			} else {
				res.setStatusCode(400).end();
			}
		});
		
		// 포트 8080
		vertx.createHttpServer().requestHandler(router::accept).listen(8080);

		// 웹소켓 핸들러
		vertx.createHttpServer().websocketHandler(new CustomWebsocketHandler()).listen(8090);
	}
}

