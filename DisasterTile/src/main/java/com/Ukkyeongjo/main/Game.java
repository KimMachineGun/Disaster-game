package com.Ukkyeongjo.main;

import java.util.Random;

public class Game {
	Random random = new Random();

	// 0 일반, 1 산, 2 바다, 3 강
	int[][] terrains = { { 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 }, { 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
			{ 1, 1, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2 }, { 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 2, 2 },
			{ 0, 0, 0, 0, 0, 3, 3, 3, 0, 2, 2, 2, 2 }, { 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2 },
			{ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2 }, { 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 } };

	// 재난
	int[][] disasters = new int[10][20];

	// 아이템
	int[][] items = new int[10][20];

	Player[] player = new Player[4];

	//재난 생성, 배치
	//매 턴마다 실행
	public void generateDisaster(int number) {
		int x, y;

		for (int i = 0; i < number; i++) {
			x = random.nextInt(20);
			y = random.nextInt(10);

			int terrain = terrains[y][x];
			int disasterNum = 0;

			switch (terrain) {
			case 0: 
				disasterNum = chooseDisaster(1, 2, 5, 7);
				break;
			case 1:
				disasterNum = chooseDisaster(1, 2, 5, 6, 7);
				break;
			case 2:
				disasterNum = chooseDisaster(4, 7);
				break;
			case 3:
				disasterNum = chooseDisaster(2, 3, 7);
			}
			
			disasters[y][x] = disasterNum;
			if ( x > 0  && y > 0) disasters[y-1][x-1] = disasterNum;
			if ( x > 0  && y < 7) disasters[y+1][x-1] = disasterNum;
			if ( x < 12  && y > 0) disasters[y-1][x+1] = disasterNum;
			if ( x < 12  && y < 7) disasters[y+1][x+1] = disasterNum;
			if ( x > 0 ) disasters[y][x-1] = disasterNum;
			if ( y > 0 ) disasters[y-1][x] = disasterNum;
			if ( x < 12 ) disasters[y][x+1] = disasterNum;
			if ( y < 7 ) disasters[y+1][x] = disasterNum;
		}
	}

	//재난 랜덤 선택
	public int chooseDisaster(int... numbers) {
		int index = random.nextInt(numbers.length);
		return numbers[index];
	}

	//아이템 생성
	//매 턴마다 실행
	public void generateItem() {
		int x, y;

		for (int i = 0; i < 2; i++) {
			while (true) {
				boolean flag = true;
				x = random.nextInt(13);
				y = random.nextInt(8);

				for (int j = 0; j < 4; j++) {
					if (player[j].x == x && player[j].y == y)
						flag = false;
				}

				if (items[y][x] != 0)
					flag = false;

				if (flag)
					break;
			}

			items[y][x] = random.nextInt(8) + 1;
		}
	}
	
	public void setPlayerPosition(int x, int y, int playerNum, int item) {
		player[playerNum].x = x;
		player[playerNum].y = y;
		player[playerNum].item = item;
	}
	
	public void playerControl(int x, int y, int playerNum, boolean isItemUsed){
		int disasterNum;
		
		disasterNum = disasters[y][x];
		
		player[playerNum].disaster(disasterNum, isItemUsed);
	}
}
