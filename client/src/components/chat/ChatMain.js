import React, {useContext} from 'react';
import './chat.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import SendMessage from "./SendMessage";
import Dialog from "./Dialog";

const ChatMain = observer(() => {
    const {chat} = useContext(Context)
    // console.log(chat.chatWith)
    return (
        <div className={'chatMain'}>

            <Dialog/>

            <SendMessage/>
        </div>
    );
})

export default ChatMain;