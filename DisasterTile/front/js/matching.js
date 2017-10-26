var socket;
const reader = new FileReader();

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
        reader.readAsText(event.data);
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

document.getElementById("cancel").onclick = function()
{
    var jsonData = JSON.stringify
    (
        {
            "status": "matchingCancel"
        }
    );

    send(jsonData);
    window.location.href = '/';
}

// onload

var jsonData = JSON.stringify
(
    {
        "status": "matching"
    }
);

send(jsonData);
