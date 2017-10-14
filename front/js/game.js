var tiles = document.getElementsByClassName("tile");

var body = document.getElementById("body");
var width, height;

var isMoveClicked = false;
var isMoved = false;
var isItemUsed = false;

var users =
[
    {
        id: 0,
        x: 10,
        y: 7,
        item: 0
    },

    {
        id: 1,
        x: 1,
        y: 1,
        item: 0
    },

    {
        id: 2,
        x: 2,
        y: 2,
        item: 0
    },

    {
        id: 3,
        x: 3,
        y: 3,
        item: 0
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
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
];

// socket

var socket;
const reader = new FileReader();

reader.onload = function(event)
{
    let temp = JSON.parse(reader.result);
    var resData = temp;
    
    if(resData.status == 'in-game')
    {
        if(resData.code == 'receiveMove')
        {
            readerReceiveMove(resData);
        }
        
        else if(resData.code == 'init')
        {
            myID = resData.id;
        }
        
        else if(resData.code == 'turn')
        {
            eraseAllBackground();
            setTimeout("drawDisaster()", 600);  
            setTimeout("eraseAllBackground()", 800);
            updateTurn(resData);
        }
        
        else if(resData.code == 'time')
        {
            
        }
        
        else if(resData.code == 'tip')
        {
            updateTip(resData.tip);
        }
    }
};

if (window.WebSocket)
{
    socket = new WebSocket("ws://52.79.133.54/game-ws");

    socket.onmessage = function (event)
    {
        reader.readAsText(event.data);
    };

    socket.onopen = function (event)
    {
        alert("Server On");
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
        alert("Server Closed");
    };
}

else
{
    alert("Use Different Browser");
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
		"x" : users[myID].x ,
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
		"isItemUsed" : isItemUsed
	};
    send(JSON.stringify(temp));
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
    setCircleSizfe();
}

function readerReceiveMove(resData)
{
    for(var i = 0; i < 4; i++)
    {
        if(i == myID) i++;
        else
        {
            erase("player" + i);

            users[i].x = resData.positions[i].x;
            users[i].y = resData.positions[i].y;

            drawPlayer(users[i].id, users[i].x, users[i].y)
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
        '<img src="../static/Player' + (id+1) + '.png" id="player' + id + '" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'
    
    tiles[x + y * 20].children[1].style.display = "none";
}

function drawPlayerLight(id, x, y, direction)
{
    var width = tiles[x + y * 20].clientWidth;
    
    tiles[x + y * 20].children[0].innerHTML = 
        '<img src="../static/Player' + (id+1) + 'Light.png" id="player' + id + direction + '" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'
    
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
            console.log(tiles[j + i * 20].style.backgroundImage);
            tiles[j + i * 20].style.backgroundImage = "";
            console.log(tiles[j + i * 20].style.backgroundImage);
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

function drawItem(itemNum, x, y)
{
    var src;
    
    switch(itemNum)
    {
        case 0: src = "ItemHealKit"; break;
        case 1: src = "ItemFireExtinguisher"; break;
        case 2: src = "ItemWetTowel"; break;
        case 3: src = "ItemDesk"; break;
        case 4: src = "ItemSandbag"; break;
        case 5: src = "ItemLightningRod"; break;
        case 6: src = "ItemRadio"; break;
        case 7: src = "ItemCar"; break;
    }

    var width = tiles[x + y * 20].clientWidth;
    
    tiles[x + y * 20].children[1].innerHTML =
        '<img src="../static/' + src + '.png" class="item" style="width: ' + width + 'px; height: ' + width + 'px; position: relative; left: 0; top: 0;">'
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
    //isMoved = true;

    document.getElementById("move").style.color = "gray";
}

function moveCancel()
{
    eraseLight();
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
        case 0: src = "itemHealKit"; break;
        case 1: src = "itemFireExtinguisher"; break;
        case 2: src = "itemWetTowel"; break;
        case 3: src = "itemDesk"; break;
        case 4: src = "itemSandbag"; break;
        case 5: src = "itemLightningRod"; break;
        case 6: src = "itemRadio"; break;
        case 7: src = "itemCar"; break;
    }
    
    var slot = document.getElementById("slot");
    slot.innerHTML = '<img src="../static/' + src + '.png" alt="" width="' + slot.clientWidth + 'px" height="' + slot.clientHeight + 'px">';
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

// onclick                                                      

document.getElementById("move").onclick = function()
{
    if(!isMoveClicked && !isMoved)
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

for(var i = 0; i < 4; i++)
{
    drawPlayer(users[i].id, users[i].x, users[i].y);
}

drawItem(2, 4, 7);  
drawItem(4, 5, 6);
drawItem(5, 6, 5);
drawItem(6, 7, 4);

gainItem(6);
updateHealth(40);

updateScore(340);

updateTurn(5);
updateTime(10);
updateTip("Hello");

drawDisasterAlarm();