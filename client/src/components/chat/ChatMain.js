import React, {useContext} from 'react';
import './chat.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChatMain = observer(() => {
    const {chat} = useContext(Context)
    return (
        <div className={'chat'}>
            Chat main
            <br/>
            chat with  user{chat.chatWith}
        </div>
    );
})

export default ChatMain;