import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChatPreview = observer(({dialog}) => {

    const {user} = useContext(Context)

    const {userId, userName, userPhoto, time, sender, media, message, unreadCounter, pinned, heRead} = dialog


    const you = sender === user.userId

    return (
        <div className={'dialog'}>

            <div className={'dialogPhoto'}>
                <img src={userPhoto} className={'userAvatar'}
                />
            </div>


            <div className={'dialogMeta'}>
                <div className={'dialogTime'}>
                    18:45
                </div>
                {unreadCounter!==0 ?
                    <div className={'unreadCounter'}>
                        <div className={'unreadCounterText'}>
                        {unreadCounter}
                        </div>
                    </div>
                    :
                    null
                }
                { !heRead && unreadCounter===0?
                    <div className={'heReadMarker'}> </div>
                    :
                    null
                }

            </div>

            <div className={'dialogCenter'}>
                <div className={'dialogWith'}>
                     {userName}
                </div>
                <div className={'dialogMessage'}>
                   {you?
                       <span className={'blueMessage'}>You: </span>
                       :
                       null}
                    {message}
                    {media?
                        <span className={'blueMessage'}>{media} </span>
                        :
                        null
                     }
                </div>
            </div>


        </div>
    );
})

export default ChatPreview;