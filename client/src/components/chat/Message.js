import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {parseDate} from "../../functions/parseDate";
import {toJS} from "mobx";


const Message = observer(({message, userInfoNeeded}) => {


    let {from, text, media, read, createdAt} = message
    const {user, chat, socketStore} = useContext(Context)
// console.log(userInfoNeeded)

    // console.log(authorId, text, media, read, date)
    // console.log(createdAt)
    // console.log(chat.chatAvatar)

    const [readState, setReadState] = useState(read)

    createdAt = parseDate(createdAt)


    const readHandler = ()=>{
      chat.markReadMessage(message.id)
        // so

    }

    // console.log(message)


    return (
        <div className='messageBlock'
        onMouseMove={()=>{
            readHandler()
        }}
        >
            {
                readState?
                    null
                    :
                    <div className={'unreadMarker'}> </div>

            }



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