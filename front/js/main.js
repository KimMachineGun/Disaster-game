var socket;

if (window.WebSocket) {
    socket = new WebSocket("ws://localhost:8090/game-ws");

    socket.onmessage = function (event) {
        var resData = JSON.parse(event.data);   
        if(resData.status == 'matched') {
            window.location.href = '/game';
        }
    };

    socket.onopen = function (event) {
        alert("Server On");
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

