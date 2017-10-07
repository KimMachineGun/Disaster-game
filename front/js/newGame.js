var tiles = document.getElementsByClassName("tile");

for(var i = 0; i < tiles.length; i++)
{
    tiles[i].innerHTML = i;
}

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
    //setMenuMargin();
    setHealthCircleSize();
}

function makeTilesToSquare()
{
    var left = document.getElementsByTagName("left")[0];
    var main = document.getElementsByTagName("main")[0];
    var bottom = document.getElementsByTagName("bottom")[0];
    
    main.style.height = ((main.offsetWidth - 64) / 2) + 64 + "px";
    bottom.style.height = left.clientHeight - main.offsetHeight + "px";
}

function setMenuMargin()
{
    var bottom = document.getElementsByTagName("bottom")[0];
    var menu = document.getElementById("menu");

    menu.style.marginTop = (bottom.clientHeight - menu.offsetHeight) / 2 + "px";
    menu.style.marginBottom = (bottom.clientHeight - menu.offsetHeight) / 2 + "px";
}

function setHealthCircleSize()
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


// onload

makeTilesToSquare();
//setMenuMargin();
setHealthCircleSize();