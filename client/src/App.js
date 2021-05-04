import React, {useContext, useEffect, useState} from 'react'
import NavBar from "./components/navbar/NavBar";
import LeftMenuMain from "./components/leftMenu/LeftMenuMain";
import ChatMain from "./components/chat/ChatMain";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import AuthPage from "./components/auth/AuthPage";
import {observer} from "mobx-react-lite";
import {check, getAvatar} from "./http/userAPI";



const App = observer(() => {

    const {user} = useContext(Context)

    const [loading, setLoading] = useState(true)

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
                // user.setUserAvatar(data.avatar)

            }).finally(()=> setLoading(false))

        }, 0)



    }, [])

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
