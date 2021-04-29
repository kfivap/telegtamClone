import React, {useEffect, useState} from 'react';
import axios from 'axios'

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data)
            setMessages(prev=> [message, ...prev])
        }
        eventSource.onerror = function (event) {
            console.log(event)
        }
    }


    const sendMessage = async () => {
        axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className='center'>
            <div className={'form'}>
                <input value={value} onChange={e => setValue(e.target.value)} type={'text'}/>
                <button onClick={sendMessage}>send</button>
            </div>
            <div className='messages'>
                {messages.map(mess =>
                    <div className={'message'} key={mess.id}>
                        {mess.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventSourcing;