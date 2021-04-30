import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Message = observer(({message, userInfoNeeded}) => {


    const {authorId, text, media, read, date} = message
    const {user, chat} = useContext(Context)
// console.log(userInfoNeeded)

    // console.log(authorId, text, media, read, date)
    // console.log(user.userAvatar)
    // console.log(chat.chatAvatar)

    return (
        <div className='messageBlock'>

            <div className={'unreadMarker'}>

            </div>
            <div className='userAvatarSmallDiv'>
                {
                    userInfoNeeded ?

                        <img src={user.userId === authorId ?
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
                            {user.userId === authorId ?
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


            <div className={'messageTime'}>{date}</div>
        </div>
    );
})

export default Message;