import React, {useContext} from 'react'
import NavBar from "./components/navbar/NavBar";
import LeftMenuMain from "./components/leftMenu/LeftMenuMain";
import ChatMain from "./components/chat/ChatMain";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import AuthPage from "./components/auth/AuthPage";
import {observer} from "mobx-react-lite";


const App = observer(()=> {

    const {user} = useContext(Context)

    if(!user.isAuth){
        return <AuthPage/>
    }

    return (
        <div className="App">
<BrowserRouter>
            <div className='pageWrap'>
                <NavBar/>
                <div className='flexContainer'>
                    <LeftMenuMain/>
                    <ChatMain/>
                </div>

            </div>
</BrowserRouter>
        </div>
    );
})

export default App;
