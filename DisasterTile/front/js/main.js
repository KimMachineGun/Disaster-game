var socket;
var reader;

reader.onload = function(event)
{
		let temp = JSON.parse(reader.result);
		console.log(temp);
		if(temp.status == 'matched')
        {
            window.location.href = '/game';
        }
};

if (window.WebSocket)
{
    socket = new WebSocket("ws://13.124.89.246:8090/game-ws");

    socket.onmessage = function (event)
    {
			reader = new FileReader();
      reader.readAsText(event.data);
    };

    socket.onopen = function (event)
    {
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

document.getElementById("start").onclick = function()
{
    var jsonData = JSON.stringify
    (
        {
            "status": "matching"
        }
    );

    send(jsonData);
    document.getElementById("matchingCover").style.display = "block";
}

document.getElementById("how-to-play").onclick = function()
{
    window.location.href = '/howtoplay';
}

document.getElementById("ranking").onclick = function()
{
    window.location.href = '/ranking';
}

// cover

document.getElementById("cancel").onclick = function()
{
    var jsonData = JSON.stringify
    (
        {
            "status": "matchingCancel"
        }
    );

    send(jsonData);
    document.getElementById("matchingCover").style.display = "none";
}
