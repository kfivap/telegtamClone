import React, {useContext, useLayoutEffect, useState} from 'react';
import {Context} from "../../index";
import Message from "./Message";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const Dialog = observer(() => {

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [width, height] = useWindowSize();

    const {chat} =useContext(Context)

    let lastId = null


    return (
        <div className={'chatMessages'}
        style={{height: height-200}}
        >

            {toJS(chat.messageList).map((message, index)=>{

                let userInfoNeeded = true
                if(lastId === message.authorId ){
                    userInfoNeeded = false
                }

                lastId = message.authorId

                return(<Message
                    key={index}
                    message={message}
                    userInfoNeeded={userInfoNeeded}

                />)
            })}


        </div>
    );
})

export default Dialog;