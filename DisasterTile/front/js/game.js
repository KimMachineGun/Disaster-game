var tiles = document.getElementsByClassName("tile");

var body = document.getElementById("body");
var width, height;
var turn = 0;

var isMoveClicked = false;
var isMoved = false;
var isItemUsed = false;

var health;
var score;

var users =
[
    {
        id: 0,
        x: 0,
        y: 0,
        item: 0,
        health: 100,
        isDisconnected: false
    },

    {
        id: 1,
        x: 1,
        y: 1,
        item: 0,
        health: 100,
        isDisconnected: false
    },

    {
        id: 2,
        x: 2,
        y: 2,
        item: 0,
        health: 100,
        isDisconnected: false
    },

    {
        id: 3,
        x: 3,
        y: 3,
        item: 0,
        health: 100,
        isDisconnected: false
    }
];

var myID = 0;

var topography =
[
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var disasters =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var items =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//result

var res = new Array(4);

for(var i = 0; i < 4; i++)
{
    res[i] =
    {
        ranking: 0,
        username: "unknown",
        score: 0
    }
}

function printResult()
{
    console.log("printResult 실행됨");

    var array = document.getElementsByClassName("ranking");

    for(var i= 0; i < array.length; i++)
    {
        array[i].parentElement.children[0].innerHTML = res[i].ranking;
        array[i].parentElement.children[2].innerHTML = res[i].username;
        array[i].parentElement.children[4].innerHTML = res[i].score;
    }
}

document.getElementById("close").onclick = function()
{
    // 여기다가 서버로 결과값 (아마 score)을 보내주는 코드 추가
    window.location.href = "/";
}

// socket

var socket;

if (window.WebSocket)
{
    socket = new WebSocket("ws://13.124.89.246:8090/game-ws");

    socket.onmessage = function (event)
    {
        let resData = JSON.parse(event.data);

        if(resData.status == 'in-game')
        {
            if(resData.code == 'receiveMove')
            {
                readerReceiveMove(resData);
            }

            else if(resData.code == 'init')
            {
                myID = resData.id;
                setHealthImage(myID);

                for(var i = 0; i < 4; i++)
                {
                    drawPlayer(users[i].id, users[i].x, users[i].y);
                }
            }

            else if(resData.code == 'time')
            {
                if(resData.time == 10)
                {
                    turn++;

                    if(turn >= 16)
                    {
                        enableEndCover();

                        $.ajax({
                            url: '/result',
                            method: 'post',
                            data: JSON.stringify({ "score": score }),
                            success: function(data) {
                            },
                            error: function() {
                                console.log('get tip error');
                            }
                        });

                        for(var i = 0; i < 4; i++)
                        {
                            res[i].username = "PLAYER" + myID
                            res[i].score = resData.score[i];
                            res[i].ranking = 5;

                            for(var j = 0; j < 4; j++)
                            {
                                if(res[i].score >= res[j].score) res[i].ranking--;
                            }
                        }

                        printResult();
                    }

                    else
                    {
                        health = resData.health[myID];
                        score = resData.score[myID];
                        item = resData.pItem[myID];
                        updateTurn(turn);
                        updateHealth(health);
                        updateScore(score);
                        gainItem(item);

                        isMoved = false;
                        isMoveClicked = false;
                        if(users[myID].isDisconnected)
                        {
                            document.getElementById("move").style.color = "gray";
                        }
                        else
                        {
                            document.getElementById("move").style.color = "#C77575";
                        }

                        disasters = resData.disaster;
                        items = resData.item;

                        for(var i = 0; i < 4; i++)
                        {
                            if(resData.health[i] <= 0 && !users[i].isDisconnected) disconnectPlayer(i);
                        }

                        drawDisasterAlarm();
                        drawItem();

                        $.ajax({
                            url: '/tip',
                            method: 'get',
                            success: function(data) {
                                let tip = JSON.parse(data);
                                $("#content").text(tip.content);
                            },
                            error: function() {
                                console.log('get tip error');
                            }
                        });
                    }
                }

                if(resData.time == -1)
                {
                    sendTurnEnd();
                    eraseAllBackground();
                    setTimeout("drawDisaster()", 500);
                    setTimeout("eraseAllBackground()", 700);
                }

                if(resData.time != -1)
                {
                    updateTime(resData.time);
                }
            }

            else if(resData.code == 'disconnect')
            {
                disconnectPlayer(resData.id);
            }
        }
    };

    socket.onopen = function (event)
    {
      send(JSON.stringify
        (
          {
            "status" : "in-game",
            "code" : "connected"
          }
        )
      );
    };

    socket.onclose = function (event)
    {
    };
}

else
{
}

function send(message)
{
    if (socket.readyState == WebSocket.OPEN)
    {
        socket.send(message);
    }

    else
    {
        alert("WebSocket Closed");
    }
}

function sendPlayerXY()
{
    var temp =
    {
		"status" : "in-game",
		"code" : "sendMove",
		"id" : myID,
		"x" : users[myID].x,
		"y" : users[myID].y,
		"item": 0
	};
    send(JSON.stringify(temp));
}

function sendTurnEnd()
{
    var temp =
    {
		"status" : "in-game",
		"code" : "end",
        "id": myID,
		"isItemUsed" : isItemUsed
	};
    send(JSON.stringify(temp));

    document.getElementById("slot").style.backgroundImage = "url(../static/WhiteCircle.png)";
    isItemUsed = false;
}

function requestTip()
{
    $.ajax
    (
        {
            url: '/tip',
            type: 'get',
            data: jsonData,
            success: function(data)
            {
                var resData = JSON.parse(data);
                updateTip(resData.content);
            }
        }
    )
}

// socket

//setInterval
//(
//    function()
//    {
//        console.log(tiles[0]);
//    }
//);

onresize = function()
{
    makeTilesToSquare();
    setCircleSize();
}

function readerReceiveMove(resData)
{
    for(var i = 0; i < 4; i++)
    {
        if(i != myID && !users[i].isDisconnected)
        {
            console.log("isDisconnected: " + users[i].isDisconnected);
            console.log("readerReceiveMove ID = " + i);
            erase("player" + i);

            users[i].x = resData.positions[i].x;
            users[i].y = resData.positions[i].y;

            drawPlayer(users[i].id, users[i].x, users[i].y);
        }
    }
}

function makeTilesToSquare()
{
    var left = document.getElementsByTagName("left")[0];
    var main = document.getElementsByTagName("main")[0];
    var bottom = document.getElementsByTagName("bottom")[0];

    main.style.height = ((main.offsetWidth - 64) / 2) + 64 + "px";
    bottom.style.height = left.clientHeight - main.offsetHeight + "px";
}

function setCircleSize()
{
    var bottom = document.getElementsByTagName("bottom")[0];
    var menu = document.getElementById("menu");
    var health = document.getElementById("health");
    var slot = document.getElementById("slot");

    healthHeight = health.offsetHeight;

    health.style.width = healthHeight + "px";
    slot.style.width = healthHeight + "px";
    slot.style.height = healthHeight + "px";
}

function drawPlayer(id, x, y)
{
    var width = tiles[x + y * 20].clientWidth;

    tiles[x + y * 20].children[0].innerHTML =
        '<img src="../static/Player' + id + '.png" id="player' + id + '" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'

    tiles[x + y * 20].children[1].style.display = "none";
}

function drawPlayerLight(id, x, y, direction)
{
    var width = tiles[x + y * 20].clientWidth;

    tiles[x + y * 20].children[0].innerHTML =
        '<img src="../static/Player' + id + 'Light.png" id="player' + id + direction + '" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'

    tiles[x + y * 20].children[1].style.display = "none";
}

function erase(id)
{
    document.getElementById(id).parentElement.parentElement.children[1].style.display = "block";
    document.getElementById(id).parentElement.innerHTML = "";
}

function eraseAll()
{
    for(var i = 0; i < tiles.length; i++)
    {
        tiles[x + y * 20].children[0].innerHTML = "";
        tiles[x + y * 20].children[1].innerHTML = "";
    }
}

function eraseAllBackground()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 20; j++)
        {
            setTimeout("", 500);
            tiles[j + i * 20].style.backgroundImage = "";
        }
    }
}

function eraseLight()
{
    if(document.getElementById("player" + myID + "Left") != null)
    {
        erase("player" + myID + "Left");
    }

    if(document.getElementById("player" + myID + "Right") != null)
    {
        erase("player" + myID + "Right");
    }

    if(document.getElementById("player" + myID + "Top") != null)
    {
        erase("player" + myID + "Top");
    }

    if(document.getElementById("player" + myID + "Bottom") != null)
    {
        erase("player" + myID + "Bottom");
    }
}

function drawItem()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 20; j++)
        {
            drawItemXY(items[i][j], j, i);
        }
    }
}

function drawItemXY(itemNum, x, y)
{
    var src;

    switch(itemNum)
    {
        case 0: src = "none"; break;
        case 1: src = "ItemHealKit"; break;
        case 2: src = "ItemFireExtinguisher"; break;
        case 3: src = "ItemWetTowel"; break;
        case 4: src = "ItemDesk"; break;
        case 5: src = "ItemSandbag"; break;
        case 6: src = "ItemLightningRod"; break;
        case 7: src = "ItemRadio"; break;
        case 8: src = "ItemCar"; break;
    }

    var width = tiles[x + y * 20].clientWidth;

    if(src == "none")
    {
        tiles[x + y * 20].children[1].innerHTML = "";
    }
    else
    {
        tiles[x + y * 20].children[1].innerHTML = '<img src="../static/' + src + '.png" class="item" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'
    }
}

function setHealthImage(id)
{
    document.getElementById("health").style.backgroundImage = "url(../static/Player" + id + ".png)";
}

// MOVE 버튼 누르면 실행됨
function move()
{
    var id = users[myID].id;
    var x = users[myID].x;
    var y = users[myID].y;

    if(x != 0)
    {
        if(tiles[(x - 1) + y * 20].children[0].innerHTML.indexOf("player") == -1)
        {
            drawPlayerLight(id, x - 1, y, "Left");

            document.getElementById("player" + id + "Left").onclick = function()
            {
                moveDecide("Left");
            }
        }
    }

    if(x != 19)
    {
        if(tiles[(x + 1) + y * 20].children[0].innerHTML.indexOf("player") == -1)
        {
            drawPlayerLight(id, x + 1, y, "Right");

            document.getElementById("player" + id + "Right").onclick = function()
            {
                moveDecide("Right");
            }
        }
    }

    if(y != 0)
    {
        if(tiles[x + (y - 1) * 20].children[0].innerHTML.indexOf("player") == -1)
        {
            drawPlayerLight(id, x, y - 1, "Top");

            document.getElementById("player" + id + "Top").onclick = function()
            {
                moveDecide("Top");
            }
        }
    }

    if(y != 9)
    {
        if(tiles[x + (y + 1) * 20].children[0].innerHTML.indexOf("player") == -1)
        {
            drawPlayerLight(id, x, y + 1, "Bottom");

            document.getElementById("player" + id + "Bottom").onclick = function()
            {
                moveDecide("Bottom");
            }
        }
    }
}

function moveDecide(direction)
{
    erase("player" + myID);
    eraseLight();

    if(direction == "Left") users[myID].x -= 1;
    else if(direction == "Right") users[myID].x += 1;
    else if(direction == "Top") users[myID].y -= 1;
    else if(direction == "Bottom") users[myID].y += 1;

    sendPlayerXY();
    drawPlayer(users[myID].id, users[myID].x, users[myID].y);
    isMoveClicked = false;
    isMoved = true;

    document.getElementById("move").style.color = "gray";
}

function moveCancel()
{
    eraseLight();
}

function disconnectPlayer(id)
{
    console.log("disconnectPlayer" + id);
    erase("player" + id);
    users[id].isDisconnected = true;
}

function setMapColor()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 20; j++)
        {
            switch(topography[i][j])
            {
                case 0: tiles[j + i * 20].style.backgroundColor = "#B7E99F";
                        tiles[j + i * 20].style.borderColor = "#87D463";
                        break;

                case 1: tiles[j + i * 20].style.backgroundColor = "#D9A379";
                        tiles[j + i * 20].style.borderColor = "#D87F3A";
                        break;

                case 2: tiles[j + i * 20].style.backgroundColor = "#8FB1C9";
                        tiles[j + i * 20].style.borderColor = "#779DB8";
                        break;

                case 3: tiles[j + i * 20].style.backgroundColor = "#A4D6FA";
                        tiles[j + i * 20].style.borderColor = "#81CAFF";
                        break;
            }
        }
    }
}

function gainItem(itemNum)
{
    var src;

    switch(itemNum)
    {
        case 0: src = "none"; break;
        case 1: src = "ItemHealKit"; break;
        case 2: src = "ItemFireExtinguisher"; break;
        case 3: src = "ItemWetTowel"; break;
        case 4: src = "ItemDesk"; break;
        case 5: src = "ItemSandbag"; break;
        case 6: src = "ItemLightningRod"; break;
        case 7: src = "ItemRadio"; break;
        case 8: src = "ItemCar"; break;
    }

    var slot = document.getElementById("slot");
    if(src == "none")
    {
        slot.innerHTML = "";
    }
    else
    {
        slot.innerHTML = '<img src="../static/' + src + '.png" alt="" width="' + slot.clientWidth + 'px" height="' + slot.clientHeight + 'px">';
    }
}

function updateHealth(health)
{
    document.getElementById("health").innerHTML = health;
}

function updateScore(score)
{
    document.getElementById("score").children[1].innerHTML = score;
}

function updateTurn(turn)
{
    document.getElementById("turn").children[3].innerHTML = turn + "/";
}

function updateTime(time)
{
    document.getElementById("time").children[3].innerHTML = time + "/";
}

function updateTip(tip)
{
    document.getElementById("tip").children[1].innerHTML = tip;
}

function drawDisaster()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 20; j++)
        {
            var src;

            switch(disasters[i][j])
            {
                case 1: src = "DisasterFire"; break;
                case 2: src = "DisasterEarthquake"; break;
                case 3: src = "DisasterFlood"; break;
                case 4: src = "DisasterTsunami"; break;
                case 5: src = "DisasterLightning"; break;
                case 6: src = "DisasterLandslide"; break;
                case 7: src = "DisasterEarthquake"; break;
                case 8: src = "DisasterTyphoon"; break;
            }

            if(disasters[i][j] != 0)
            {
                tiles[j + i * 20].style.backgroundImage = "url(../static/" + src + ".png)";
            }
        }
    }
}

function drawDisasterAlarm()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 20; j++)
        {
            var src;

            switch(disasters[i][j])
            {
                case 1: src = "DisasterFire"; break;
                case 2: src = "DisasterEarthquake"; break;
                case 3: src = "DisasterFlood"; break;
                case 4: src = "DisasterTsunami"; break;
                case 5: src = "DisasterLightning"; break;
                case 6: src = "DisasterLandslide"; break;
                case 7: src = "DisasterEarthquake"; break;
                case 8: src = "DisasterTyphoon"; break;
            }

            if(disasters[i][j] != 0)
            {
                tiles[j + i * 20].style.backgroundImage = "url(../static/" + src + ".png), url(../static/Disaster40.png)";
            }
        }
    }
}

function enableEndCover()
{
    document.getElementById("endCover").style.display = "block";
}

// onclick

document.getElementById("move").onclick = function()
{
    if(!isMoveClicked && !isMoved && !users[myID].isDisconnected)
    {
        move();
        isMoveClicked = true;
    }

    else
    {
        moveCancel();
        isMoveClicked = false;
    }
}

document.getElementById("menu").onclick = function()
{
    document.getElementById("menuCover").style.display = "block";
}

document.getElementById("howToPlay").onclick = function()
{

}

document.getElementById("quit").onclick = function()
{

}

document.getElementById("back").onclick = function()
{
    document.getElementById("menuCover").style.display = "none";
}

document.getElementById("slot").onclick = function()
{
    if(!isItemUsed)
    {
        document.getElementById("slot").style.backgroundImage = "url(../static/BorderCircle.png)";
        isItemUsed = true;
    }

    else
    {
        document.getElementById("slot").style.backgroundImage = "url(../static/WhiteCircle.png)";
        isItemUsed = false;
    }

}

// onload

makeTilesToSquare();
setCircleSize();
setMapColor();
