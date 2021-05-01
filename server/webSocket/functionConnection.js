 function connection(ws) {
    // ws.id = Date.now()
    ws.on('message', function (message) {
        message = JSON.parse(message)
        console.log(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break

            case 'connection':
                broadcastMessage(message)
                break
        }
    })}


function broadcastMessage(message, id) {

    wss.clients.forEach(client=>{
        // if(client.id === id){
        client.send(JSON.stringify(message))

        // }

    })
}