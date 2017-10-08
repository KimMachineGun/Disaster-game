var tiles = document.getElementsByClassName("tile");

var body = document.getElementById("body");
var width, height;

//setInterval
//(
//    function()
//    {
//        console.log("setInterval");
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

// onload

makeTilesToSquare();
setCircleSize();

drawPlayer(0, 0, 0);
drawPlayer(1, 1, 1);
drawPlayer(2, 2, 2);
drawPlayer(3, 3, 3);