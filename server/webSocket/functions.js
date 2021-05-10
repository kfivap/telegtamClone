const {Message, Chat, UnreadCounter} = require('../models/models')


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
            await UnreadCounter.create({
                chatId: chat.id
            })

        }

        let newMessage = await Message.create({
            from: message.from,
            to: message.to,
            text: message.text,
            chatId: chat.id
        })
        let updatedChat = await chat.update({
            lastMessage: JSON.stringify(newMessage)
        })


        let socketMessage = JSON.parse(JSON.stringify(newMessage))
        socketMessage.event = message.event



        let updatedUnreadIndex = usersArray.findIndex(elem=>elem===message.to)

        // let findChat = await Chat.findOne({where: {usersArray}})
        let unreadDB =await UnreadCounter.findOne({where:{
               chatId: chat.id
            }})
       let unreadCount  = JSON.parse(JSON.stringify(unreadDB))
        unreadCount.unread[updatedUnreadIndex]+=1

        // console.log(unreadCount.unread)

        await unreadDB.update(
        {unread: unreadCount.unread})


let       messageFrom = {
            event: 'getMessageId',
    id: message
}

        wss.clients.forEach(client => {

            console.log(client.id)
            if (client.id === socketMessage.to) {
                client.send(JSON.stringify(socketMessage))
            }
            if(client.id === message.from){
                client.send(JSON.stringify(socketMessage))
            }



        })
    }


    async ReadMessage(wss, message, ws) {

        const {id, from, to, text, userId} = message
        // console.log(message)
        if(!id || !from ||  !to || !userId){

            return
        }

        if(userId === from && from!==to) {
            return
        }

        let usersArray = [from, to].sort(function (a, b) {
            return a - b
        })


        const dbMessage = await Message.findOne(
            {
                where: {
                    id, from, to, text
                }
            }
        )
        message.chatId = dbMessage.chatId

        const readMessage = await dbMessage.update(
            {read: true}
        )

        let updatedUnreadIndex = usersArray.findIndex(elem=>elem===to)

        let unreadDB =await UnreadCounter.findOne({where:{
                chatId: dbMessage.chatId
            }})
        let unreadCount  = JSON.parse(JSON.stringify(unreadDB))
        unreadCount.unread[updatedUnreadIndex]-=1

        await unreadDB.update(
            {unread: unreadCount.unread})




        wss.clients.forEach(client => {

            if (client.id === from) {
                console.log(client.id)
                client.send(JSON.stringify(message))
            }
            if (client.id === to) {
                console.log(client.id)
                client.send(JSON.stringify(message))
            }
        })

        // console.log(wss.clients)


    }
}
module.exports = new WebSocketFunctions
