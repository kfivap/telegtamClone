import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChatPreview = observer(({dialog}) => {

    const {user, chat} = useContext(Context)

    const {userId, userName, userPhoto, time, sender, media, message, unreadCounter, pinned, heRead} = dialog


    const you = sender === user.userId
    const selected = chat.chatWith === userId


    const chatClickHandler = ()=>{
        // console.log('select chat', userId)
        chat.setChatWith(userId)
        chat.setChatAvatar(userPhoto)
    }

    return (
        <div className={`dialog ${selected? 'dialogSelected': null}`}
        onClick={chatClickHandler}
        >

            <div className={'dialogPhoto'}>
                <img src={userPhoto} className={'userAvatar'}
                />
            </div>


            <div className={`dialogMeta
            ${selected? 'dialogMetaSelected': null}
            `}>
                <div className={'dialogTime'}>
                    18:45
                </div>
                {unreadCounter!==0  &&!you?
                    <div className={'unreadCounter'}>
                        <div className={'unreadCounterText'}>
                        {unreadCounter}
                        </div>
                    </div>
                    :
                    null
                }
                { !heRead && (unreadCounter===0 || you) ?
                    <div className={'heReadMarker'}> </div>
                    :
                    null
                }

            </div>

            <div className={
                `dialogCenter 
                ${selected? 'dialogCenterSelected': null}
                `}>
                <div className={'dialogWith'}>
                     {userName}
                </div>
                <div className={'dialogMessage'}>
                   {you?
                       <span className={`
                       ${selected? null: 'blueMessage'}
                       `}>
                           You:&nbsp;
                       </span>
                       :
                       null}
                    {message}
                    {media?
                        <span className={`
                       ${selected? null: 'blueMessage'}
                       `}>{media} </span>
                        :
                        null
                     }
                </div>
            </div>


        </div>
    );
})

export default ChatPreview;