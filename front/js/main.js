var socket;
const reader = new FileReader();

reader.onload = function(event) {
		let temp = JSON.parse(reader.result);
		console.log(temp);
		if(temp.status == 'matched') {
            window.location.href = '/game';
        }
};	

if (window.WebSocket) {
    socket = new WebSocket("ws://52.79.133.54/game-ws");

    socket.onmessage = function (event) {
        reader.readAsText(event.data);
        
    };

    socket.onopen = function (event) {
        alert("Server On");
		send(JSON.stringify({
				"status" : "in-game",
				"code" : "connected"
		}));
    };

    socket.onclose = function (event) {
        alert("Server Closed");
    };

} else {
    alert("Use Different Browser");
}

function send(message) {
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
    } else {
        alert("WebSocket Closed");
    }
}

$("#start").on("click", function() {
    let jsonData = JSON.stringify({
        "status": "matching"
    });
    send(jsonData);
});

