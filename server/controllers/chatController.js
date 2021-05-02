const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize");

class ChatController {

    async findUsers(req, res, next) {

const {searchNick} = req.query

        let users = await User.findAll({
            limit:15,

            where: {
                 nick:{
                     [Op.like]: "%" + searchNick + "%"
                 }
                },
        attributes: [['id', "userId"], ['nick', 'userName']]
        })

        return res.json({
            users

        })
    }

}

module.exports = new ChatController()