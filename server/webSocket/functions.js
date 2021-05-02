const {Message, Chat} = require('../models/models')


class WebSocketFunctions  {

    async broadcastMessage(wss, message) {

// console.log(message)
        let usersArray = [message.from, message.to].sort(function(a, b){return a-b})

        let chat = await Chat.findOne({
            where: {usersArray: usersArray}
        })
        if(!chat){
          chat = await Chat.create({
                usersArray: usersArray
            })

        }


       let newMessage  = await Message.create({
            from: message.from,
            to: message.to,
            text: message.text,
           chatId: chat.id
        })
        // console.log(newMessage)
        wss.clients.forEach(client=>{
            // if(client.id === id){
            client.send(JSON.stringify(message))

            // }

        })
    }

}

module.exports = new WebSocketFunctions
