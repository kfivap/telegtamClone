const {Message, Chat} = require('../models/models')


class WebSocketFunctions {

    async broadcastMessage(wss, message, ws) {

        // console.log(message)
        let usersArray = [message.from, message.to].sort(function (a, b) {
            return a - b
        })

        let isNull = false
        usersArray.map(user => {
            if (!user) {
                isNull = true
            }
        })

        if (isNull) {
            return
        }




        let chat = await Chat.findOne({
            where: {usersArray: usersArray}
        })
        if (!chat) {
            chat = await Chat.create({
                usersArray: usersArray
            })

        }


        let newMessage = await Message.create({
            from: message.from,
            to: message.to,
            text: message.text,
            chatId: chat.id
        })


        let socketMessage = JSON.parse(JSON.stringify(newMessage))
        socketMessage.event = message.event



        let updatedUnreadIndex = usersArray.findIndex(elem=>elem===message.to)

        let findChat = await Chat.findOne({where: {usersArray}})
        findChat.unread[updatedUnreadIndex] +=1


        let updatedChat = await chat.update({
            lastMessage: JSON.stringify(newMessage),
            unread: findChat.unread
        })
        // console.log(findChat)

        // console.log(message)
        wss.clients.forEach(client => {
            // if(client.id === id)
            if (client.id === socketMessage.to || client.id === socketMessage.from) {
                client.send(JSON.stringify(socketMessage))
            }
            // client.send(JSON.stringify(socketMessage))

            // console.log('message to', socketMessage.to,
            //     'client.id', client.id,
            //     "ws.id", ws.id
            // )


        })
    }


    async ReadMessage(wss, message, ws) {

        const {id, from, to, text, userId} = message
        if(!id || !from ||  !to || !userId){
            console.log('here')
            return
        }

        if(userId === from && from!==to) {
            return
        }

        let usersArray = [from, to].sort(function (a, b) {
            return a - b
        })

        const readMessage = await Message.update(
            {read: true},
            {
                where: {
                    id, from, to, text
                }
            }
        )


        let updatedUnreadIndex = usersArray.findIndex(elem=>elem===message.to)

        let chat = await Chat.findOne({where: {usersArray}})
        let findChat = await Chat.findOne({where: {usersArray}})
        findChat.unread[updatedUnreadIndex] -=1
        console.log(findChat.unread)


        let updatedChat = await chat.update({
            unread: findChat.unread
        })



        wss.clients.forEach(client => {
            if (client.id === to || client.id === from) {
                console.log(client.id)
                client.send(JSON.stringify(message))
            }
        })

        // console.log(wss.clients)


    }
}
module.exports = new WebSocketFunctions
