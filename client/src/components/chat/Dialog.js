import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import Message from "./Message";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {getMessages} from "../../http/messageAPI";

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




    async function fetchData(){


        if(!chat.chatWith){
            console.log('here')
            return
        }
        let messages = await getMessages(chat.chatWith, chat.offset)

        messages.rows=messages.rows.reverse()
        chat.pushMessageList(messages.rows)
        chat.increaseOffset(10)

    }

    useEffect(()=>{
       fetchData().then(()=>{

       })
        return(()=>{
            console.log('upper useEffect')
            chat.resetOffset()


        })
    }, [chat.chatWith])




    const dialogRef = useRef()

    // console.log('scrollTop',dialogRef.current?.scrollTop)
    // console.log('scrollHeight', dialogRef.current?.scrollHeight)
    // console.log('clientHeight', dialogRef.current?.clientHeight)


    let lastId = null
    return (
        <div className={'chatMessages'}
        style={{height: height-200}}
             ref={dialogRef}
             onScroll={()=>{
                 console.log('scrollTop',dialogRef.current?.scrollTop)
                 console.log('scrollHeight', dialogRef.current?.scrollHeight)
                 console.log('clientHeight', dialogRef.current?.clientHeight)

             }
             }
        >
            <button
            onClick={()=>{
                fetchData()
            }}
            >fetch</button>

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