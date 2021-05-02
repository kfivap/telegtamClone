const {User, Message, Chat} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

const {Op} = require("sequelize");

class MessageController {

    async getMessages(req, res, next) {

        const {searchId} = req.query
        let userId = checkUserMiddleware(req).id


        let usersArray = [searchId, userId].sort(function(a, b){return a-b})

        let chat = await Chat.findOne({
            where: {usersArray}
        })

        let messages = await Message.findAll({
            limit:15,
            where: {
                chatId: chat.id
            },
            order: [["id", "DESC"]]
        })

        return res.json(messages)
    }

}

module.exports = new MessageController()