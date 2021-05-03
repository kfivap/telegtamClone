const {Message, Chat} = require('../models/models')


class WebSocketFunctions  {

    async broadcastMessage(wss, message, ws) {

console.log(message)
        let usersArray = [message.from, message.to].sort(function(a, b){return a-b})

        let isNull = false
        usersArray.map(user=>{
            if(!user){
                isNull = true
            }
        })

        if(isNull){
            return
        }


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





        let socketMessage = JSON.parse(JSON.stringify(newMessage))
        socketMessage.event = message.event
        // console.log(socketMessage)


        let updatedChat = await chat.update({
            lastMessage: JSON.stringify(newMessage)
        })

console.log(message)
        wss.clients.forEach(client=>{
            // if(client.id === id)
            if(client.id===socketMessage.to){
                client.send(JSON.stringify(socketMessage))
            }
            // client.send(JSON.stringify(socketMessage))

            console.log('message to', socketMessage.to,
                'client.id', client.id,
               "ws.id",ws.id
                )
// console.log(client.id===socketMessage.to)

            // }

        })
    }

}

module.exports = new WebSocketFunctions
