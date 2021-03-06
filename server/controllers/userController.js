
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize");
const uuid = require('uuid')
const path = require('path')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')



const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nickRegExp = /^[\w.-]{0,19}[0-9a-zA-Z]$/i

class UserController {
    async registration(req, res, next) {
        let {email, password, nick, role, name} = req.body
        if (!email || !password || !nick) {
            return res.status(400).json({message: "Not stated email or password or nick"})
        }


        if (!email.match(emailRegExp)) {
            return res.status(400).json({message: 'wrong email format'})
        }


        if (!nick.match(nickRegExp)) {
            return res.status(400).json({message: 'wrong nick format'})
        }

        const candidateEmail = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {nick}
                ]
            }
        })

        if (candidateEmail) {
            let errorFields = []
            if (candidateEmail.dataValues.email === email) {
                errorFields.push('email')
            }
            if (candidateEmail.dataValues.nick === nick) {
                errorFields.push('nick')
            }

            return res.status(400).json({message: `${errorFields} already registered`})
        }


        /////////// edit
        if (!role) {
            role = 'ADMIN'
        }


        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, nick, password: hashPassword})




        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, userId: user.id})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return res.status(404).json({message: 'email not found'})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({message: 'wrong password'})
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, userId: user.id})


    }

    async check(req, res, next) {
        try{
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            // console.log(req.user)
            const user = await User.findOne({where:{id:req.user.id}})
            return res.json({
                token,
                id:user.id,
                nick: user.nick
            })
        } catch (e) {
            return res.json({message: e.message})
        }


    }




    async getUserNames(req, res){

        let {idList} = req.query

         idList = idList.split(',').map(id=>+id)

        // console.log(idList)

       let userNames =  await User.findAll({
            where:{
                id: idList
            },
            attributes: [['id', "userId"], ['nick', 'userName'], 'avatar']
        })

        return res.json(userNames)
    }



    async setProfileInfo(req, res){
        let {name, userId} = req.body
        if (checkUserMiddleware(req).id !== parseInt(userId)) {

            return res.status(403).json('Not allowed')
        }

        let fileName = null
        try {
            const {img} = req.files
            fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'staticBig', fileName))

            const sharp = require('sharp');


            path.resolve(__dirname, '..', 'static', fileName)

            sharp(path.resolve(__dirname, '..', 'staticBig', fileName))
                .resize(400,400)
                .toFile(path.resolve(__dirname, '..', 'static', fileName))






            console.log(fileName)
        } catch (e) {
            console.log(e.message)
        }

        if (fileName) {
            const updated = await User.update(
                {
                    avatar: fileName
                },
                {where: {id:userId}}
            )
            return res.json(updated)
        }
        if (!fileName) {
            // const updated = await User.update(
            //     {
            //         name, location, age, sex, shortBio
            //     },
            //     {where: {userId}}
            // )
            // return res.json(updated)
            return res.status(400)
        }


    }


    async getAvatar(req, res){
        const {userId} = req.query
        console.log(userId===undefined)
        if(!userId){
            return res.status(404).json({message: 'id not stated'})
        }

        const avatar = await User.findOne({
            where:{
                id:userId
            },
            attributes: ['avatar']
        })
        return res.json(avatar.avatar)
    }




}

module.exports = new UserController()