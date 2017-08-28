package com.Ukkyeongjo.main;

import java.sql.*;

public class DB {
	static Connection conn = null;
	static Statement statement = null;
	
	static void create() {
		String userTable = "CREATE TABLE USERS " +
			               "(NO INT PRIMARY KEY NOT NULL, " +
			               "ID CHAR(16) NOT NULL UNIQUE, " + 
			               "PW CHAR(16) NOT NULL, " + 
			               "WIN INT, " + 
			               "LOSE INT, " +
			               "EXP INT, " +
			               "HIGHSCORE INT)";
		
		try {
			statement.executeUpdate(userTable);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static void connect() {
		System.out.println(System.getProperty("java.class.path"));
		try {
			Class.forName("org.sqlite.JDBC");
			conn = DriverManager.getConnection("jdbc:sqlite:DisasterTile.db");
			statement = conn.createStatement();
		} catch (ClassNotFoundException e) {
			System.out.println("Can not found org.sqlite.JDBC");
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("SQL Exception");
			e.printStackTrace();
		}
	}
	
	static int executeUpdate(String query) {
		try {
			int temp = statement.executeUpdate(query);
			return temp;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		}
	}
	
	static ResultSet executeQuery(String query) {
		try {
			ResultSet temp = statement.executeQuery(query);
			return temp;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
}
