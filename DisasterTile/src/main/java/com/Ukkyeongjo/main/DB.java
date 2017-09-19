package com.Ukkyeongjo.main;

import java.sql.*;

public class DB {
	static Connection conn = null;
	static Statement statement = null;
	
	static void create() {
		String userTable = "CREATE TABLE USERS " +
			               "(NO INT PRIMARY KEY, " +
			               "ID CHAR(16) NOT NULL UNIQUE, " + 
			               "PW CHAR(16) NOT NULL, " + 
			               "WIN INT, " + 
			               "LOSE INT, " +
			               "EXP INT, " +
			               "HIGHSCORE INT);";
		
		String tipTable = "CREATE TABLE TIPS " +
						  "(NO INT PRIMARY KEY NOT NULL, " +
						  "CONTENT TEXT NOT NULL);";
		
		try {
			statement.executeUpdate(userTable);
			statement.executeUpdate(tipTable);
			} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static void connect() {
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
}
