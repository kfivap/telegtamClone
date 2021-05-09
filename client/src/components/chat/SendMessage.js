import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import WebSock from "../../WebSock";
import {toJS} from "mobx";

const SendMessage = observer(() => {

    const {user, chat, leftChats, socketStore} =useContext(Context)


    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)




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

        socketStore.setMessage(message)
        socketStore.setSending(true)

        // socket.current.send(JSON.stringify(message))

        setValue('')
    }


    const sendManyMessagesDev =  ()=>{
        for(let i = 0; i<100; i++){

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
                socketStore.setMessage(message)
                socketStore.setSending(true)
            }, i*20)



        }
    }


    console.log(user.userAvatar)
    return (
        <div className={'sendComponent'}>
            <div className={'userPhoto'}>
<img src={user.userAvatar? process.env.REACT_APP_API_URL  + user.userAvatar: ''} className='userAvatarSend'/>
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