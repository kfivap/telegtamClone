import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import WebSock from "../../WebSock";
import {toJS} from "mobx";

const SendMessage = observer(() => {

    const {user, chat, leftChats} =useContext(Context)


    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)




    function connect() {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            setConnected(true)

            const message = {
                event: 'connection',
                from: user.userId,
                id: user.userId
            }
            socket.current.send(JSON.stringify(message))
            console.log('connection setup')
        }
        socket.current.onmessage = (event) => {

            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])

            // console.log(message)

            if(chat.chatWith === message.from){
                chat.pushMessageList(message)
            }

            //
            let chatList = toJS(leftChats.chatsList)


            // chatList.forEach(chat=>{
            //
            //     if(chat.chatId===message.chatId){
            //         console.log(chat)
            //         chat.text=message.text
            //         chat.updatedAt = message.createdAt
            //         chat.from = message.from
            //     }
            //
            //     return chat
            // })
            // console.log(chatList)



            for(let i=0; i<chatList.length; i++){
                // console.log(chatList)
                if(chatList[i].chatId === message.chatId){
                    chatList[i].text=message.text
                    chatList[i].updatedAt = message.createdAt
                    chatList[i].from = message.from

                    let tempElement = chatList[i]
                    chatList.splice(i, 1)
                    chatList.unshift(tempElement)
                    break
                }

            }



            leftChats.setChatsList(chatList)



        }
        socket.current.onclose = () => {
            console.log('socket closed')
            setConnected(false)

            console.log('trying reconnect in 5 seconds')
            setTimeout(()=>{
                connect()
            }, 5000)


        }
        socket.current.onerror = () => {
            console.log('socket error')
            console.log('trying reconnect in 5 seconds')
            setTimeout(()=>{
                connect()
            }, 5000)
        }

    }

    const sendMessage = async () => {

        const message = {
            event: 'message',
            from: user.userId,
            to: chat.chatWith,
            text: value,
            id: user.userId,
            read: false,
            createdAt: new Date(),
            media: null

        }
        socket.current.send(JSON.stringify(message))

        setValue('')
    }


    const sendManyMessagesDev =  ()=>{
        for(let i = 0; i<1000; i++){

            const message = {
                event: 'message',
                from: user.userId,
                to: chat.chatWith,
                text: `
                ${i} chat with ${chat.chatWith}
                
                `,
                id: user.userId,
                read: false,
                createdAt: new Date(),
                media: null

            }


            setTimeout(()=>{
                socket.current.send(JSON.stringify(message))
            }, i*10)



        }
    }


    useEffect(()=>{
        if(!connected){
            connect()
        }
    }, [])

    return (
        <div className={'sendComponent'}>
            <div className={'userPhoto'}>
<img src={user.userAvatar} className='userAvatarSend'/>
            </div>
            <div className={'divTextArea'}>
                <textarea
                    className={'messageTextArea'}
                    placeholder={'Write a message...'}
                    value={value}
                   onChange={e=>setValue(e.target.value)}
                />
                <div className='sendButton'
                onClick={sendMessage}
                >Send</div><

                div className='sendButton'
                onClick={sendManyMessagesDev}
                >send many</div>
            </div>

            <div className={'chatPhoto'}>
                <img src={chat.chatAvatar} className='userAvatarSend'/>
            </div>

        </div>
    );
})

export default SendMessage;