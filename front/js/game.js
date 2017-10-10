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
            x: 0,
            y: 0,
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

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
            for(var i = 0; i < 4; i++)
            {
                if(i == myID) i++;
                else
                {
                    erase(users[i].x, users[i].y);
                    
                    users[i].x = resData.positions[i].x;
                    users[i].y = resData.positions[i].y;
                    
                    drawPlayer(users[i].id, users[i].x, users[i].y)
                }
            }
        }
        
        else if(resData.code == 'init')
        {
            myID = resData.id;
        }
    }
};


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
    tiles[x + y * 20].style.backgroundImage = "url(../static/Player" + (id+1) + ".png)";
}

function drawPlayerLight(id, x, y)
{
    tiles[x + y * 20].style.backgroundImage = "url(../static/Player" + (id+1) + "Light.png)";
}

function erase(x, y)
{
    tiles[x + y * 20].style.backgroundImage = "";
}

function eraseAll()
{
    for(var i = 0; i < tiles.length; i++)
    {
        tiles[i].style.backgroundImage = "";
    }
}

function drawItem(itemNum, x, y)
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
    
    tiles[x + y * 20].style.backgroundImage = "url(../static/" + src + ".png)"
}

function move(id, x, y)
{
    if(x != 0)
    {
        if(tiles[(x - 1) + y * 20].style.backgroundImage == "")
        {
            drawPlayerLight(id, x - 1, y);
        }
    }
        
    if(x != 19)
    {
        if(tiles[(x + 1) + y * 20].style.backgroundImage == "")
        {
            drawPlayerLight(id, x + 1, y);
        }
    }
    
    if(y != 0)
    {
        if(tiles[x + (y - 1) * 20].style.backgroundImage == "")
        {
            drawPlayerLight(id, x, y - 1);
        }
    }
    
    if(y != 9)
    {
        if(tiles[x + (y + 1) * 20].style.backgroundImage == "")
        {
            drawPlayerLight(id, x, y + 1);
        }
    }
}

function moveCancel(id, x, y)
{
    if(x > 0)
    {
        if(tiles[(x - 1) + y * 20].style.backgroundImage == 'url("../static/Player' + (id+1) + 'Light.png")')
        {
            erase(x - 1, y);
        }
    }
    
    if(x < 19)
    {
        if(tiles[(x + 1) + y * 20].style.backgroundImage == 'url("../static/Player' + (id+1) + 'Light.png")')
        {
            erase(x + 1, y);
        }
    }
    
    if(y > 0)
    {
        if(tiles[x + (y - 1) * 20].style.backgroundImage == 'url("../static/Player' + (id+1) + 'Light.png")')
        {
            erase(x, y - 1);
        }
    }
    
    if(y < 9)
    {
        if(tiles[x + (y + 1) * 20].style.backgroundImage == 'url("../static/Player' + (id+1) + 'Light.png")')
        {
            erase(x, y + 1);
        }
    }
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
    
}

// onclick                                                      

document.getElementById("move").onclick = function()
{
    if(!isMoveClicked && !isMoved)
    {
        move(users[myID].id, users[myID].x, users[myID].y);
        isMoveClicked = true;
    }
    
    else
    {
        moveCancel(users[myID].id, users[myID].x, users[myID].y);
        isMoveClicked = false;
    }
}

for(var i = 0; i < tiles.length; i++)
{
    tiles[i].onclick = function()
    {
        var x = this.getAttribute("data-index") % 20;
        var y = Math.floor(this.getAttribute("data-index") / 20);
        if(tiles[x + y * 20].style.backgroundImage == 'url("../static/Player' + (users[myID].id+1) + 'Light.png")')
        {
            erase(users[myID].x, users[myID].y);
            if(users[myID].x < 19) erase(users[myID].x + 1, users[myID].y);
            if(users[myID].x > 0) erase(users[myID].x - 1, users[myID].y);
            if(users[myID].y < 9) erase(users[myID].x, users[myID].y + 1);
            if(users[myID].y > 0) erase(users[myID].x, users[myID].y - 1);

            users[myID].x = x;
            users[myID].y = y;
            drawPlayer(users[myID].id, users[myID].x, users[myID].y);

            isMoveClicked = false;
            isMoved = true;
            
            document.getElementById("move").style.color = "gray";
        }
    }
}

document.getElementById("menu").onclick = function()
{
    document.getElementById("menuCover").style.display = "block";
}

document.getElementById("ranking").onclick = function()
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
        document.getElementById("slot").style.backgroundColor = "black";
        isItemUsed = true;
    }
    
    else
    {
        document.getElementById("slot").style.backgroundColor = "";
        isItemUsed = false;
    }
    
}

// onload

makeTilesToSquare();
setCircleSize();
setMapColor();

drawPlayer(3, 3, 3);

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