import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import {toJS} from "mobx";
import {parseDate} from "../../functions/parseDate";

const ChatPreview = observer(({dialog}) => {

    let history = useHistory();

    const {user, chat} = useContext(Context)

    let {userId, userName, userPhoto, createdAt, from, media, text, unreadCounter, pinned, heRead} = dialog

    createdAt = parseDate(createdAt, true)


    const you = from === user.userId
    const selected = chat.chatWith === userId


    const chatClickHandler = ()=>{
        // if(chat.chatWith){
            // chat.setCacheMessages(chat.chatWith)
        // }

        chat.setChatWith(userId)
        chat.setChatAvatar(userPhoto)
        chat.setChatWithName(userName)

        // const cachedMessages  = toJS(chat.cachedMessagesList)
        // if(cachedMessages[chat.chatWith]){
        //     chat.setMessageList(cachedMessages[chat.chatWith])
        // } if(!cachedMessages[chat.chatWith]){
            chat.setMessageList([])
        // }


        history.push(`/im/${userId}`)
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
                    {createdAt}
                </div>
                {unreadCounter  &&!you?
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
                    {text}
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