import React, {useContext, useEffect, useRef, useState} from 'react'
import NavBar from "./components/navbar/NavBar";
import LeftMenuMain from "./components/leftMenu/LeftMenuMain";
import ChatMain from "./components/chat/ChatMain";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import AuthPage from "./components/auth/AuthPage";
import {observer} from "mobx-react-lite";
import {check, getAvatar} from "./http/userAPI";
import {runInAction, toJS} from "mobx";




const App = observer(() => {

    const {user, chat, leftChats, socketStore} =useContext(Context)
    const socket = useRef()
    const [loading, setLoading] = useState(true)
    const [connected, setConnected] = useState(false)


    useEffect(()=>{
        setTimeout(()=>{
            check().then(data=>{
                // console.log(data)

                user.setIsAuth(true)
                user.setUserId(data.id)
                user.setUserName(data.nick)
                getAvatar(data.id).then((avatar)=>{
                    user.setUserAvatar(avatar)
                })
                console.log(data)
                if(!connected){
                    connect()
                }
                // user.setUserAvatar(data.avatar)

            }).finally(()=> setLoading(false))

        }, 0)


    }, [])




    function connect() {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            setConnected(true)

            const message = {
                event: 'connection',
                // from: user.userId,
                id: user.userId
            }
            socket.current.send(JSON.stringify(message))
            console.log('connection setup')
        }

        socket.current.onmessage = (event) => {

            const message = JSON.parse(event.data)


            if(message.event === 'readMessage'){

                chat.markReadMessage(message.id)
                console.log(message)
                // if(message.from === user.userId){
                //
                // }


                console.log(message.chatId)
                if(message.from !== user.userId ){
                    console.log(123)
                    leftChats.setUnreadCounterByChatId(message.chatId, -1)
                }



                return
            }


            console.log(message)
            if(chat.chatWith === message.from || chat.chatWith === message.to){
                chat.pushMessageList(message)
            }

            //
            let chatList = toJS(leftChats.chatsList)


            for(let i=0; i<chatList.length; i++){
                // console.log(chatList)
                if(chatList[i].chatId === message.chatId){
                    chatList[i].text=message.text
                    chatList[i].updatedAt = message.createdAt
                    chatList[i].from = message.from

                    let tempElement = chatList[i]
                    chatList.splice(i, 1)
                    chatList.unshift(tempElement)
                    break
                }

            }

            leftChats.setChatsList(chatList)
            if(message.from !== user.userId ){
                leftChats.setUnreadCounterByChatId(message.chatId, 1)
            }

        }
        socket.current.onclose = () => {
            console.log('socket closed')
            setConnected(false)

            console.log('trying reconnect in 5 seconds')
            setTimeout(()=>{
                connect()
            }, 5000)


        }
        socket.current.onerror = () => {

            console.log('socket error')
            console.log('trying reconnect in 5 seconds')
            setTimeout(()=>{
                connect()
            }, 5000)
        }



    }

    if(socketStore.sending){
        try {
                socket.current.send(JSON.stringify(socketStore.message))
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                socketStore.setSending(false)
            })
        }
    }

    if(socketStore.reading){
        try {
                socket.current.send(JSON.stringify(socketStore.reading))
            // console.log(socketStore.reading)
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                socketStore.setReading(false)
            })
        }
        // console.log(socketStore.reading)
    }


    if(loading){
        return <div>loading</div>
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className='pageWrap'>
                    {user.isAuth ?
                        <div>
                            <NavBar/>
                            <div className='flexContainer'>
                                <LeftMenuMain/>
                                <ChatMain/>
                            </div>
                        </div>
                        :
                        <AuthPage/>

                    }

                </div>
            </BrowserRouter>
        </div>
    );
})

export default App;
