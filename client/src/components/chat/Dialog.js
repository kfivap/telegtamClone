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


    // console.log(window.location)



    let lastId = null
    return (
        <div className={'chatMessages'}
        style={{height: height-200}}
        >

            {toJS(chat.messageList).map((message, index)=>{

                if(!message){ return }
                let userInfoNeeded = true
                if(lastId === message.from ){
                    userInfoNeeded = false
                }

                lastId = message.from

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