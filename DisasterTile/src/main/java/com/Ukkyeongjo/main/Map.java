package com.Ukkyeongjo.main;

import java.util.Random;

public class Map {
	Random random = new Random();

	// 0 일반, 1 산, 2 바다, 3 강
	int[][] terrains = { { 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 }, { 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
			{ 1, 1, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2 }, { 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 2, 2 },
			{ 0, 0, 0, 0, 0, 3, 3, 3, 0, 2, 2, 2, 2 }, { 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2 },
			{ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2 }, { 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 } };

	// 재난
	int[][] disasters = new int[8][13];

	// 아이템
	int[][] items = new int[8][13];

	Player[] player = new Player[4];

	private void generateDisaster(int number) {
		int x, y;

		for (int i = 0; i < number; i++) {
			x = random.nextInt(13);
			y = random.nextInt(8);

			int terrain = terrains[y][x];
			int disasterNum;

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
		}
	}

	private int chooseDisaster(int... numbers) {
		int index = random.nextInt(numbers.length);
		return numbers[index];
	}

	private void generateItem() {
		int x, y;

		for (int i = 0; i < 2; i++) {
			while (true) {
				boolean flag = true;
				x = random.nextInt(13);
				y = random.nextInt(8);

				for (int j = 0; i < 4; i++) {
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
}
