require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models') //models needed to run even if it dont use
const cors = require('cors')
const PORT = process.env.PORT || 5000
const router = require('./routes/index')
const path = require('path')
const fileUpload = require('express-fileupload')
const ws =require('ws')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


const WSFunctions = require('./webSocket/functions')

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        const wss = new ws.Server({
            port: 5001,
        }, ()=>console.log('server started on 5001'))
        wss.on('connection',  function connection(ws) {
            ws.id = Date.now()+Math.random()
            ws.on('message', function (message) {
                message = JSON.parse(message)
                // console.log(message)
                switch (message.event) {
                    case 'message':
                        // broadcastMessage(message)

                        WSFunctions.broadcastMessage(wss, message, ws)
                        break

                    case 'connection':
                        ws.id=message.id
                        break
                }
            })
        })




        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()