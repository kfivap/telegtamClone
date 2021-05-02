const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    nick: {type: DataTypes.STRING, unique: true},
    avatar: {type:DataTypes.STRING},
    password: {type: DataTypes.STRING},
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    usersArray: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false},

})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.INTEGER, allowNull: false},
    to: {type: DataTypes.INTEGER, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    media: {type: DataTypes.TEXT},
    read: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const UserChats = sequelize.define('user_chats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.belongsToMany(Chat, {through: UserChats})
Chat.belongsToMany(User, {through: UserChats})

Chat.hasMany(Message)
Message.belongsTo(Chat)


module.exports = {
    User, Chat, Message,
    UserChats
}