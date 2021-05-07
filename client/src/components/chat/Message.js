import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {parseDate} from "../../functions/parseDate";
import {toJS} from "mobx";
import UnreadMarker from "./UnreadMarker";


const Message = observer(({message, userInfoNeeded}) => {


    let {from, to, text, media, read, createdAt, id} = message
    const {user, chat, socketStore} = useContext(Context)
// console.log(userInfoNeeded)

    // console.log(authorId, text, media, read, date)
    // console.log(createdAt)
    // console.log(chat.chatAvatar)



    createdAt = parseDate(createdAt)


    const readHandler = ()=>{
        if(message.read || message.from=== user.userId && message.to!==message.from){
            return
        }

      chat.markReadMessage(id)
        const reading = {
          event: "readMessage",
            userId: user.userId,
            from: from,
            to: to,
            text: text,
            id: id,
            read: true,
            createdAt: createdAt,
            media: media

        }
        socketStore.setReading(reading)


    }

    // console.log(message)


    return (
        <div className='messageBlock'
        onMouseMove={()=>{
            readHandler()
        }}
        >

                    <UnreadMarker message={message}/>




            <div className='userAvatarSmallDiv'>
                {
                    userInfoNeeded ?

                        <img src={user.userId === from ?
                            user.userAvatar
                            :
                            chat.chatAvatar
                        } className='userAvatarSmall'
                        alt=''
                        />
                        :
                        null
                }

            </div>


            <div className='messageText'>
                {
                    userInfoNeeded?

                        <div className='authorName'>
                            {user.userId === from ?
                                user.userName
                                :
                                chat.chatWithName
                            }
                        </div>
                        :

                        null
                }

                {text}

                {media ?
                    <div className='blueMessage'>{media}</div>
                    :
                    null}

            </div>


            <div className={'messageTime'}>{createdAt}</div>
        </div>
    );
})

export default Message;