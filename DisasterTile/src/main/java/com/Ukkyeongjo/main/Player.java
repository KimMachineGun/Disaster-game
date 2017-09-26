package com.Ukkyeongjo.main;

public class Player {
	int health = 100;
	int x = 0, y = 0;
	int item = 0; // 보유중인 아이템
	
	//아이템 사용 여부에 따른 데미지 피해량
	void disaster(int disasterNum, boolean isItemUsed) {
		int usedItem;
		int damage = 0;
		
		if(isItemUsed == false) usedItem = 0;
		else usedItem = item;
		
		//힐킷
		if(usedItem == 1){
			health += 30;
			if(health >= 100) health = 100;
			
			item = 0;
		}
		
		//화재
		if(disasterNum == 1) {
			//소화기, 젖은 수건
			if(usedItem == 2 || usedItem == 3){
				damage = 0;
				item = 0;
			}
			//자동차
			else if(usedItem == 8){
				damage = 60;
				item = 0;
			}
			else damage = 50;
		}
		
		//지진
		else if(disasterNum == 2) {
			//책상
			if(usedItem == 4) {
				damage = 0;
				item = 0;
			}
			//자동차
			else if(usedItem == 8) {
				damage = 70;
				item = 0;
			}
			else damage = 60;
		}
		
		//홍수
		else if(disasterNum == 3) {
			//튜브
			if(usedItem == 5) {
				damage = 0;
				item = 0;
			}
			//자동차
			else if(usedItem == 8) {
				damage = 50;
				item = 0;
			}
			else damage = 40;
		}
		
		//해일
		else if(disasterNum == 4) {
			//자동차
			if(usedItem == 8){
				damage = 80;
				item = 0;
			}
			else damage = 70;
		}
		
		//벼락
		else if(disasterNum == 5) {
			//피뢰침, 자동차
			if(usedItem == 6 && usedItem == 8){
				damage = 0;
				item = 0;
			}
			else damage = 100;
		}
		
		//산사태
		else if(disasterNum == 6) {
			if(usedItem == 4) {
				damage = 0;
				item = 0;
			}
			//자동차
			else if(usedItem == 8) {
				damage = 60;
				item = 0;
			}
			else damage = 50;
		}
		
		//태풍
		else if(disasterNum == 7) {
			if(usedItem == 4) {
				damage = 0;
				item = 0;
			}
			//자동차
			else if(usedItem == 8) {
				damage = 60;
				item = 0;
			}
			else damage = 50;
		}
		
		usedItem = 0;
		
		health -= damage;
	}
}
