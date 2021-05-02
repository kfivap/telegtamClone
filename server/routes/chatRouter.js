const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chatController')
// const authMiddleware = require('../middleware/authMiddleware')


router.get('/findUsers', chatController.findUsers)
router.get('/getChats', chatController.getChats)





module.exports = router