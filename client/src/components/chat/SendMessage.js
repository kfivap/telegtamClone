import React, {useContext} from 'react';
import {Context} from "../../index";

const SendMessage = () => {

    const {user, chat} =useContext(Context)


    return (
        <div className={'sendComponent'}>
            <div className={'userPhoto'}>
<img src={user.userAvatar} className='userAvatarSend'/>
            </div>
            <div className={'divTextArea'}>
                <textarea
                    className={'messageTextArea'}
                    placeholder={'Write a message...'}
                />
                <span className='sendButton'>Send</span>
            </div>

            <div className={'chatPhoto'}>
                <img src={chat.chatAvatar} className='userAvatarSend'/>
            </div>

        </div>
    );
};

export default SendMessage;