const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')



router.get('/getMessages', messageController.getMessages)



module.exports = router