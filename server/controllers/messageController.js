const {User, Message, Chat} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

const {Op} = require("sequelize");

class MessageController {

    async getMessages(req, res, next) {

        const {searchId} = req.query
        let userId = checkUserMiddleware(req).id

        if(!userId){
            return res.status(403)
        }


        let usersArray = [searchId, userId].sort(function(a, b){return a-b})

        let chat = await Chat.findOne({
            where: {usersArray}
        })
        if(!chat){
            return res.status(404).json({message: 'chat not found'})
        }

        let messages = await Message.findAll({
            limit:15,
            where: {
                chatId: chat.id
            },
            order: [["id", "ASC"]]
        })

        return res.json(messages)
    }

}

module.exports = new MessageController()