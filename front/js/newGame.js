var tiles = document.getElementsByClassName("tile");

var body = document.getElementById("body");
var width, height;

var isMoveClicked = false;
var isMoved = false;

var user = new Object();
user.id = 3;
user.x = 3;
user.y = 3;

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

// onclick

document.getElementById("move").onclick = function()
{
    if(!isMoveClicked && !isMoved)
    {
        move(user.id, user.x, user.y);
        isMoveClicked = true;
    }
    
    else
    {
        moveCancel(user.id, user.x, user.y);
        isMoveClicked = false;
    }
}

for(var i = 0; i < tiles.length; i++)
{
    tiles[i].onclick = function()
    {
        var x = this.getAttribute("data-index") % 20;
        var y = Math.floor(this.getAttribute("data-index") / 20);
        if(tiles[x + y * 20].style.backgroundImage == 'url("../static/Player' + (user.id+1) + 'Light.png")')
        {
            erase(user.x, user.y);
            if(user.x < 19) erase(user.x + 1, user.y);
            if(user.x > 0) erase(user.x - 1, user.y);
            if(user.y < 9) erase(user.x, user.y + 1);
            if(user.y > 0) erase(user.x, user.y - 1);

            user.x = x;
            user.y = y;
            drawPlayer(user.id, user.x, user.y);

            isMoveClicked = false;
            isMoved = true;
            
            document.getElementById("move").style.color = "gray";
        }
    }
}

// onload

makeTilesToSquare();
setCircleSize();

drawPlayer(3, 3, 3);

drawItem(2, 4, 7);
drawItem(4, 5, 6);
drawItem(5, 6, 5);
drawItem(6, 7, 4);