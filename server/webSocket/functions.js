const {Message} = require('../models/models')


class WebSocketFunctions  {

    async broadcastMessage(wss, message) {
       let newww  = await Message.create({
            from: message.from,
            to: message.to,
            text: message.text
        })
        console.log(newww)
        wss.clients.forEach(client=>{
            // if(client.id === id){
            client.send(JSON.stringify(message))

            // }

        })
    }

}

module.exports = new WebSocketFunctions
