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

    const {chat} = useContext(Context)
    const dialogRef = useRef()

    const [stopFetching, setStopFetching] = useState(false)

    async function fetchData() {
try{
    let limit = 50
    if (!chat.chatWith) {
        return
    }
    let messages = await getMessages(chat.chatWith, chat.offset, limit)
    if(messages.rows.length===0){
        setStopFetching(true)
    }
    messages.rows = messages.rows.reverse()
    chat.pushMessageList(messages.rows)
    chat.increaseOffset(limit)
} catch (e) {
    console.log(e)
}


    }

    useEffect(() => {
        fetchData().then(() => {
            dialogRef.current.scrollTop = dialogRef.current.scrollHeight

            if (dialogRef.current?.scrollTop === 0) {
                console.log('hereee')
            }
        })
        return (() => {
            console.log('upper useEffect')
            chat.resetOffset()
            setStopFetching(false)

        })
    }, [chat.chatWith])


    // console.log('scrollTop',)
    // console.log('scrollHeight', dialogRef.current?.scrollHeight)
    // console.log('clientHeight', dialogRef.current?.clientHeight)


    const [scrollHeight, setScrollHeight] = useState()
    const [loading, setLoading] = useState(false)




    let lastId = null

    useEffect(()=>{
        dialogRef.current.scrollTop =  chat.scroll
    }, [chat.scroll])





    return (
        <div className={'chatMessages'}
             style={{height: height - 200}}
             ref={dialogRef}
             onScroll={() => {

                 if (dialogRef.current?.scrollTop < 30
                     &&
                     !loading
                     &&
                     !stopFetching
                 ) {

                     setLoading(true)
                     fetchData().then((data) => {
                         let scrollDifference = dialogRef.current?.scrollHeight - scrollHeight
                         dialogRef.current.scrollTop = scrollDifference
                         setLoading(false)

                     })

                 }
                 setScrollHeight(dialogRef.current?.scrollHeight)


             }
             }
        >
            <button
                onClick={() => {
                    fetchData()
                }}
            >fetch
            </button>

            {toJS(chat.messageList).map((message, index) => {

                if (!message) {
                    return
                }
                let userInfoNeeded = true
                if (lastId === message.from) {
                    userInfoNeeded = false
                }

                lastId = message.from

                return (<Message
                    key={index}
                    message={message}
                    userInfoNeeded={userInfoNeeded}

                />)
            })}


        </div>
    );
})

export default Dialog;