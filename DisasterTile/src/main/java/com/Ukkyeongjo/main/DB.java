package com.Ukkyeongjo.main;

import java.sql.*;

public class DB {
	static Connection conn = null;
	static Statement statement = null;
	
	static final String userTable = "CREATE TABLE USERS " +
            "(NO INT PRIMARY KEY, " +
            "ID CHAR(16) NOT NULL UNIQUE, " + 
            "PW CHAR(16) NOT NULL, " +
            "HIGHSCORE INT);";
	
	static final String tipTable = "CREATE TABLE TIPS " +
				  "(NO INT PRIMARY KEY, " +
				  "CONTENT TEXT NOT NULL);";
	
	static final String[] tips = {
		"화재 발생 시, 연기가 많을 때는 한 손으로는 코와 입을 젖은 수건 등으로 막고 낮은 자세로 이동합니다.", 
		"화재 발생 시, 불길 속을 통과할 때에는 물에 적신 담요나 수건 등으로 몸과 얼굴을 감쌉니다.",
		"화재 발생 시, 소화기 사용 요령 1. 소화기를 불이 난 곳으로 옮겨 손잡이 부분의 안전핀을 뽑아주세요.",
		"화재 발생 시, 소화기 사용 요령 2. 바람을 등지고 서서 호스를 불쪽으로 향하게 합시다.",
		"화재 발생 시, 소화기 사용 요령 3. 손잡이를 힘껏 움켜쥐고 빗자루로 쓸듯이 뿌립시다.",
		"화재 발생 시, 소화기 사용 요령 4. 소화기는 잘 보이고 사용하기에 편리한 곳에 두되 햇빛이나 습기에 노출되지 않도록 합니다.",
		"지진 발생 시, 지진으로 흔들리는 동안은 탁자 아래로 들어가 몸을 보호하고, 탁자 다리를 꼭 잡습니다.",
		"지진 발생 시, 흔들림이 멈추면 전기와 가스를 차단하고 문을 열어 출구를 확보합니다.",
		"지진 발생 시, 건물 밖으로 나갈 때에는 계단을 이용하여 신속하게 이동합니다.",
		"지진 발생 시, 건물 밖에서는 가방이나 손으로 머리를 보호하며 건물과 거리를 두고 주위를 살피며 대피합니다.",
		"지진 발생 시, 대피 장소를 찾을 때에는 떨어지는 물건에 유의하며 신속하게 운동장이나 공원 등 넓은 공간으로 대피합니다. 이 때 자동차는 이용하지 않습니다.",
		"홍수 발생 시, 높은 곳으로 빨리 대피합니다.",
		"홍수 발생 시, 비탈면이나 산사태가 일어날 수 있는 지역에 가까이 가지 않습니다.",
		"홍수 발생 시, 침수된 지역에서 자동차를 운전하지 않습니다.",
		"홍수 발생 시, 수돗물이나 저장식수도 오염 여부를 반드시 조사 후에 사용합니다.",
		"홍수 발생 시, 침수주택은 가스·전기차단기가 off에 있는지 확인하고, 기술자의 안전조사가 끝난 후 사용합니다.",
		"해일 발생 시, 공사 중인 현장에서는 작업을 중지하고 떠내려가거나 파손될 우려가 있는 기자재들은 안전한 곳으로 이동시킵니다.",
		"해일 발생 시, 목조 주택은 떠내려갈 가능성이 있으니 벽돌이나 철근콘크리트 건물로 이동합니다.",
		"해일 발생 시, 해안에 가까울수록 위험하므로 해일이 발생하면 해안에서 멀리 떨어진 급경사가 없고 지형이 높은 안전한 곳으로 이동합니다.",
		"벼락 발생 시, 텔레비전 안테나나 전선을 따라 전류가 흐를 수 있으므로 전자제품의 취급에 주의가 필요합니다.",
		"벼락 발생 시, 가정에서는 창문을 닫고, 감전 우려가 있으므로 샤워나 설거지 등을 하지 않습니다.",
		"벼락 발생 시, 산에서는 등산용 스틱이나 우산같이 긴 물건은 땅에 뉘어 놓고, 몸에서 떨어뜨립니다.",
		"벼락 발생 시, 낙뢰는 대개 산골짜기나 강줄기를 따라 이동하는 성질이 있으므로 하천 주변에서의 야외활동을 삼갑니다.",
		"벼락 발생 시, 자동차에서는 차를 세우고 라디오 안테나를 내린 채 차 안에 그대로 머뭅니다.",
		"산사태 발생 시, 대피 시에 가스밸브를 잠그고 전기차단기를 내려 2차 피해를 방지합니다.",
		"산사태 발생 시, 산사태 방향과 멀어지는 방향으로 가장 인접한 높은 곳으로 피신합니다.",
		"산사태 발생 시, 계곡부나 물길 형성 지역 밖으로 피신합니다.",
		"태풍 발생 시, 정전 시에는 양초를 사용하지 말고 휴대용 랜턴을 사용합니다.",
		"태풍 발생 시, 건물의 출입문, 창문은 닫아서 파손되지 않도록 하고, 실내에서는 창문이나 유리문에서 되도록 떨어져 있도록 합니다.",
		"태풍 발생 시, 가스 누출로 2차 피해가 발생할 수 있으므로 사전에 차단하고, 감전의 위험이 있으므로 집 안팎의 전기시설은 만지지 않습니다.",
		"태풍 발생 시, 차량으로 이동 중에는 속도를 줄여서 운전하고, 개울가, 하천변, 해안가, 지하차도 등 급류에 휩쓸릴 수 있거나 침수위험지역은 접근하지 않습니다.",
		"태풍 발생 시, 침수의 위험이 없는 지역에서는 바람으로 인해 피해를 입지 않도록 가급적 욕실과 같이 창문이 없는 방이나 집안의 제일 안쪽으로 이동합니다."
		};
	
	static void create() {
		try {
			statement.executeUpdate(userTable);
			statement.executeUpdate(tipTable);
			for(int i = 0; i < tips.length; i++) {				
				String sql = "INSERT INTO TIPS(CONTENT) VALUES('" + tips[i] + "');";
				try {
					DB.statement.executeUpdate(sql);
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("Create Table Exception");
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
