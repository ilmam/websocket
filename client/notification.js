var webSocket;


function openSocket(){
    //console.log("openning a socket...");
    // Ensures only one connection is open at a time
    if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
        //writeResponse("WebSocket is already opened.");
        console.log("WebSocket is already opened")
        return;
    }
    // Create a new instance of the websocket
    webSocket = new WebSocket("ws://example.com:8181/websocket/server/server.js");

    /**
     * Binds functions to the listeners for the websocket.
     */
    webSocket.onopen = function(event){
        //console.log("socket is open.");
    };

    webSocket.onmessage = function(event){
        //console.log(event.data);
        msg = event.data;
        jsonMsg = JSON.parse(msg);
        message = jsonMsg["message"];
        ShowNotification (message);
    };

    webSocket.onclose = function(event){
        setTimeout(function(){
            openSocket()
        }, 10000);
    };
}

/**
 * Sends the message to the server
 */
function sendNotification(message, type, dir, updateCounter, callback){
    msg = JSON.stringify({"message": message});
    
    if(webSocket.readyState !== WebSocket.OPEN){
        //waint one sec then try again
        setTimeout(function(){ webSocket.send(msg); }, 1000);
    }else{
        webSocket.send(msg);
    }

    if(callback){
        callback();
    }
}

function closeSocket(){
    webSocket.close();
}

function ShowNotification(msg) {
    alert(msg);
}

openSocket();
