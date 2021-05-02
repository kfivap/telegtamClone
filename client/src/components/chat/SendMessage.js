import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import WebSock from "../../WebSock";

const SendMessage = observer(() => {

    const {user, chat} =useContext(Context)


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
                id: Date.now()+Math.random()
            }
            socket.current.send(JSON.stringify(message))
            console.log('connection setup')
        }
        socket.current.onmessage = (event) => {

            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])

            chat.pushMessageList(message)



        }
        socket.current.onclose = () => {
            console.log('socket closed')

        }
        socket.current.onerror = () => {
            console.log('socket error')
        }

    }

    const sendMessage = async () => {

        const message = {
            event: 'message',
            from: user.userId,
            to: chat.chatWith,
            text: value,
            id: Date.now()+Math.random(),
            read: false,
            date: '18:20',
            media: null

        }
        socket.current.send(JSON.stringify(message))


        //echo
        setTimeout(()=>{
            const message2 = {
                event: 'message',
                from: chat.chatWith,
                to: user.userId,
                text: 'echo: '+value,
                id: Date.now()+Math.random(),
                read: false,
                date: '13:77',
                media: null
            }
            socket.current.send(JSON.stringify(message2))
        }, 3000)

        setValue('')
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
                >Send</div>
            </div>

            <div className={'chatPhoto'}>
                <img src={chat.chatAvatar} className='userAvatarSend'/>
            </div>

        </div>
    );
})

export default SendMessage;