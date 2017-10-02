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
}

function makeTilesToSquare()
{
    var left = document.getElementsByTagName("left")[0];
    var main = document.getElementsByTagName("main")[0];
    var bottom = document.getElementsByTagName("bottom")[0];
    
    main.style.height = ((main.offsetWidth - 64) / 2) + 64 + "px";
    bottom.style.height = left.offsetHeight - main.offsetHeight + "px";
}

makeTilesToSquare();