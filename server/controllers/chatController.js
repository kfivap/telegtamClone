const {User, Chat, UnreadCounter} = require('../models/models')
const {Op} = require("sequelize");
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

class ChatController {

    async findUsers(req, res, next) {

        const {searchNick, id} = req.query

        let userId = checkUserMiddleware(req).id

        if(!userId || userId!==parseInt(id)){
            return res.status(403).json({message: 'auth error'})
        }



        let users = await User.findAll({
            limit: 15,

            where: {
                nick: {
                    [Op.like]: "%" + searchNick + "%"
                }
            },
            attributes: [['id', "userId"], ['nick', 'userName'], ['avatar', 'userPhoto']]
        })

        let idsArray = []

        users.map(user=>{
                let userData = JSON.parse(JSON.stringify(user))
            idsArray.push([userId,userData.userId])
        }
        )

        // console.log(idsArray)


        let OpOrQuery = []

        for(let i=0; i<idsArray.length; i++){



            let query = {
                usersArray: {
                    [Op.contains]: [idsArray[i][0], idsArray[i][1]]
                }
            }

            if(idsArray[i][0] === idsArray[i][1]){
                query = {
                    usersArray: {
                        [Op.contained]: [idsArray[i][0], idsArray[i][1]]
                    }
                }
            }

            // console.log([idsArray[i][0], idsArray[i][1]])

            OpOrQuery.push(query)
        }

        // console.log(OpOrQuery)
        let one = [1,1]

        let chats = await Chat.findAll({
            where:{
                [Op.or]: OpOrQuery

                // usersArray: {
                //     [Op.contained]: [1,1]
                // }


            },
            order: [['updatedAt', 'DESC']]
        })


        return res.json({
            users,
            chats

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
            },
            order: [['updatedAt', 'DESC']]
        })

        chats = JSON.parse(JSON.stringify(chats))
        let chatIds = []
        chats.rows.map(chat=>{
            chatIds.push(chat.id)
        })
// console.log(chatIds)


        let unread = await UnreadCounter.findAll({
            where:{
                id: chatIds
            }
        })
        unread = JSON.parse(JSON.stringify(unread))
        // console.log(unread)

        for(let i=0; i<chats.rows.length; i++){
            for(let j=0; j<unread.length; j++){
                if (chats.rows[i].id ===unread[j].chatId){
                    chats.rows[i].unread = unread[j].unread
                }
            }
        }

        // console.log(chats.rows)


        return res.json(chats)

    }

}

module.exports = new ChatController()