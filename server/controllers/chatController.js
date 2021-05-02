const {User} = require('../models/models')
const {Op} = require("sequelize");

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

    async getChatMessages(req, res){

    }

}

module.exports = new ChatController()