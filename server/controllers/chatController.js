const {User, Chat} = require('../models/models')
const {Op} = require("sequelize");
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

class ChatController {

    async findUsers(req, res, next) {

        const {searchNick} = req.query

        let users = await User.findAll({
            limit: 15,

            where: {
                nick: {
                    [Op.like]: "%" + searchNick + "%"
                }
            },
            attributes: [['id', "userId"], ['nick', 'userName']]
        })

        return res.json({
            users

        })
    }

    async getChats(req, res){

        let userId = checkUserMiddleware(req).id

        if(!userId){
            return res.status(403)
        }

        let chats = await Chat.findAndCountAll({
            where:{
                usersArray: {
                    [Op.contains]: [userId]
                }
            }
        })


        return res.json(chats)

    }

}

module.exports = new ChatController()