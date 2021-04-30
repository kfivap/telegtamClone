import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";


const WebSock = observer(() => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)




    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)

            const message = {
                event: 'connection',
                username: 1,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            console.log('connection setup')
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
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
            username:1,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

useEffect(()=>{
    if(!connected){
        connect()
    }
}, [])

    return (
        <div className='center'>
            <div className={'form'}>
                <input value={value} onChange={e => setValue(e.target.value)} type={'text'}/>
                <button onClick={sendMessage}>send</button>
            </div>
            <div className='messages'>
                {messages.map(mess =>
                    <div key={mess.id}>
                        {mess.event === 'connection'
                            ? <div className='connection_message'> user {mess.username} connected</div>
                        :<div className='message'>{mess.username}: {mess.message}</div>

                        }
                    </div>
                )}
            </div>
        </div>
    );
});

export default WebSock;