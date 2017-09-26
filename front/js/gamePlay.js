"use strict";

var INITSEC = 15;
var MAXTURN = 15;

// 이번 턴이 끝나끼까지 남은 시간을 알려주는 변수
var currentSec = INITSEC;
// 현재 턴이 몇 번째인지를 담는 변수
var currentTurn = 1;
// 배열 tips의 index를 담는 변수
var tipsIndex = 1;
var id = 0;
// 자신의 player의 ID - player1, player2, player3, player4 중에 하나
var myID = "player1";
//이번 턴에 이동했는지에 대한 변수
var isMoved = false;

var isItemUsed = false;
// 0 없음
// 1 힐킷
// 2 소화기
// 3 젖은 수건
// 4 책상
// 5 튜브
// 6 피뢰침
// 7 라디오
// 8 자동차
var item = 0;

// 테스트용 배열
// tip들을 모아놓은 배열
var tips = new Array(10);
tips[0] = "So, to become an Avenger, are there like trials or an interview?";
tips[1] = "You just don't do anything I would do... and definitely don't do anything I wouldn't do. There's a little gray area in there and that's where you operate.";
tips[2] = "That's not a hug. I'm just grabbing the door for you.";
tips[3] = "But you are a kid. / Yeah. A kid who can stop a bus with his bare hands.";
tips[4] = "If you're nothing without the suit, then you shouldn't have it.";
tips[5] = "Wait a minute... You guys aren't the real Avengers! I can tell Hulk gives it away.";
tips[6] = "Can't you just be a friendly neighborhood Spider-Man?";
tips[7] = "Can you summon an army of spiders? / No, man!";
tips[8] = "What are you hiding Peter? [laughs] I'm just kidding. I don't care. Bye.";
tips[9] = "Spider-Man is not a party trick!";

//socket

var socket;

if (window.WebSocket) {
    socket = new WebSocket("ws://localhost:8090/game-ws");

    socket.onmessage = function (event) {
        var resData = JSON.parse(event.data);   
        if(resData.status == 'in-game') {
            if(resData.code == 'receiveMove') {
                for(var i = 0; i < 3; i++) {
                    drawPlayer("player" + (resData.positions[i].id + 1), "/static/" + "Player" + (resData.positions[i].id + 1) + ".png", resData.x, resData.y);
                }
            }
            else if(resData.code == 'init') {
                id = resData.id;
                myID = "player" + (id + 1);
            }
        }
    };

    socket.onopen = function (event) {
        alert("서버 열려있음");
    };

    socket.onclose = function (event) {
        alert("서버 닫힘");
    };

} else {
    alert("지원하지 않는 브라우저");
}

$("#sendBtn").on("click", function() {
    send($("#message").val());
});

function send(message) {
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
    } else {
        alert("웹소켓 닫힘");
    }
}

//socket

// 팁을 갱신하는 메서드
function writeNewTip() {
    var randomNum;

    do {
        randomNum = Math.floor(Math.random() * 10);
    } while (randomNum === tipsIndex);

    tipsIndex = randomNum;

    $("#tips-tip-text").text(tips[randomNum]);
}

// 각 턴이 시작될 때 실행되는 메서드
function startTurn() {

    // 턴 시작 알람
    alert("Turn Start");

    //move 기능 활성화
    isMoved = false;
    $("#move-text").css("color", "#C77575");

    // 아이템 정보 갱신

    // 팁 갱신
    writeNewTip();

    // 현재 턴 갱신
    currentTurn += 1;
    if (currentTurn >= 10) {
        $("#current-turn-text").css("margin-left", "12px");
    }
    $("#current-turn-text").text(currentTurn + "/");

    // 남은 시간 갱신
    currentSec = INITSEC;
    $("#remaining-time-text").css("margin-left", "60px");
    $("#remaining-time-text").text(currentSec);
}

// 각 턴이 끝날 때 실행되는 메서드
function endTurn() {
    alert("Time Out");
    
    if (currentTurn < MAXTURN) {
        startTurn();
    }
}



// 1초마다 실행
setInterval(function () {
    if (currentSec > -2) {
        currentSec -= 1;
    }
    if (currentSec < 10) {
        $("#remaining-time-text").css("margin-left", "168px");
    }
    if (currentSec >= 0) {
        $("#remaining-time-text").text(currentSec);
    }
    if (currentSec === -1) {
        endTurn();
    } else { }
}, 1000);


// player의 x좌표를 구하는 메서드
function getMapCoordinateX(playerID) {
    var squareID = $(document.getElementById(playerID)).parent().attr("id"),
        x = parseInt(squareID.charAt(5), 10);

    if (squareID.length === 7) {
        x = parseInt(x + squareID.charAt(6), 10);
    }

    return x;
}

// player의 y좌표를 구하는 메서드
function getMapCoordinateY(playerID) {
    var squareID = $(document.getElementById(playerID)).parent().attr("id"),
        y = parseInt(squareID.charAt(3), 10);

    return y;
}

function sendPlayerXY() {
    var text = '{ "status" : "in-game", "code" : "sendMove", "x" : ' + getMapCoordinateX(myID) + ', "y" : ' + getMapCoordinateY(myID) + ' }';

    var jsonFile = JSON.parse(text);
    send(JSON.stringify(jsonFile));
}

// player를 그리는 메서드
// playerID : player의 id
// imageSrc : player 이미지의 경로
// x : player의 x좌표
// y : player의 y좌표
function drawPlayer(playerID, imageSrc, x, y) {
    var squareID = "sqr" + y + "x" + x;
    if (document.getElementById(squareID).innerHTML === '') {
        document.getElementById(squareID).innerHTML = '<img src="' + imageSrc + '" id="' + playerID + '" style="margin:4px; width:80px; height:80px;">';
    }
}

// id가 playerID인 이미지를 삭제
function erasePlayer(playerID) {
    var x = getMapCoordinateX(playerID),
        y = getMapCoordinateY(playerID),
        squareID = "sqr" + y + "x" + x;
    document.getElementById(squareID).innerHTML = '';
}


// id가 playerID인 이미지와 그 상하좌우에 위치한(except는 제외) 이미지들을 삭제
// except : string, Top/Right/Bottom/Left 중 하나
function erasePlayerExcept(playerID, except) {
    // 삭제하지 않을 이미지의 x, y값 받아오기
    var x = getMapCoordinateX(playerID + except),
        y = getMapCoordinateY(playerID + except);

    //이미지 모두 삭제
    if (document.getElementById(playerID) !== null) {
        erasePlayer(playerID);
    }
    if (document.getElementById(playerID + "Top") !== null) {
        erasePlayer(playerID + "Top");
    }
    if (document.getElementById(playerID + "Right") !== null) {
        erasePlayer(playerID + "Right");
    }
    if (document.getElementById(playerID + "Bottom") !== null) {
        erasePlayer(playerID + "Bottom");
    }
    if (document.getElementById(playerID + "Left") !== null) {
        erasePlayer(playerID + "Left");
    }

    // 삭제하지 않았어야 할 이미지 다시 그리기
    drawPlayer(playerID, "/static/" + playerID + ".png", x, y);
    //bindingFunction();
}

// innerhtml로 그린 오브젝트와 onclick 메서드를 연결해주는 역할
function bindingFunction() {
//    $("#player1").click(function() {
//        alert("player1");
//    });
//
//    $("#player2").click(function() {
//        alert("player2");
//    });
//
//    $("#player3").click(function() {
//        alert("player3");
//    });
//
//    $("#player4").click(function() {
//        alert("player4");
//    });

    //이동할 방향을 선택했을 때 나머지 이미지를 지워주는 onclick 메서드
    if (document.getElementById(myID + "Top") !== null) {
        document.getElementById(myID + "Top").onclick = function () {
            erasePlayerExcept(myID, "Top");
            $("#move-text").css("color", "#bbbbbb");
            isMoved = true;
            sendPlayerXY();
        };
    }

    if (document.getElementById(myID + "Right") !== null) {
        document.getElementById(myID + "Right").onclick = function () {
            erasePlayerExcept(myID, "Right");
            $("#move-text").css("color", "#8d8d8d");
            isMoved = true;
            sendPlayerXY();
        };
    }

    if (document.getElementById(myID + "Bottom") !== null) {
        document.getElementById(myID + "Bottom").onclick = function () {
            erasePlayerExcept(myID, "Bottom");
            $("#move-text").css("color", "#8d8d8d");
            isMoved = true;
            sendPlayerXY();
        };
    }

    if (document.getElementById(myID + "Left") !== null) {
        document.getElementById(myID + "Left").onclick = function () {
            erasePlayerExcept(myID, "Left");
            $("#move-text").css("color", "#8d8d8d");
            isMoved = true;
            sendPlayerXY();
        };
    }
}

// move 버튼을 눌렀을 때 실행되는 메서드
// player 주위 상하좌우에 연한 원이 그려짐
function chooseMoveDirection(playerID) {
    var x = getMapCoordinateX(playerID),
        y = getMapCoordinateY(playerID);

    if (y !== 1) {
        drawPlayer(playerID + "Top", "/static/" + playerID + "Light" + ".png", x, y - 1); // Top
    }
    if (x !== 12) {
        drawPlayer(playerID + "Right", "/static/" + playerID + "Light" + ".png", x + 1, y); // Right
    }
    if (y !== 7) {
        drawPlayer(playerID + "Bottom", "/static/" + playerID + "Light" + ".png", x, y + 1); // Bottom
    }
    if (x !== 1) {
        drawPlayer(playerID + "Left", "/static/" + playerID + "Light" + ".png", x - 1, y); // Left
    }
}


// move 버튼을 클릭하면
$("#move-text").click(function () {
    //이미 움직였으면 아무것도 안함
    if (isMoved) {
    
    //움직일 기회가 있다면, 이미 주위에 원이 그려져 있지 않다면
    } else if ((document.getElementById(myID + "Top") === null) &&
             (document.getElementById(myID + "Right") === null) &&
             (document.getElementById(myID + "Bottom") === null) &&
             (document.getElementById(myID + "Left") === null)) {
        //주위에 원을 그림
        chooseMoveDirection(myID);
        
    //이미 주위에 원이 그려져 있다면 move를 취소하는 기능 실행
    } else {
        erasePlayerExcept(myID, "");
    }

    bindingFunction();
});

// 첫 번째 item 슬롯을 클릭하면
$("#item").click(function () {
    if(isItemUsed === true) {
        isItemUsed = false;
        $("#item").css("border", "");  
    }
    else {
        isItemUsed = true;
        $("#item").css("border", "1px solid black");    
    }
});




drawPlayer("player1", "/static/" + "Player1.png", 8, 1);
drawPlayer("player2", "/static/" + "Player2.png", 3, 2);
drawPlayer("player3", "/static/" + "Player3.png", 7, 4);
drawPlayer("player4", "/static/" + "Player4.png", 10, 7);

//health-circle 이미지 파일을 플레이어의 이미지 파일과 같게 만듦
$("#health-circle").attr("src", "/static/" + myID + ".png");
bindingFunction();