import React from 'react'
import NavBar from "./components/navbar/NavBar";
import LeftMenuMain from "./components/leftMenu/LeftMenuMain";
import ChatMain from "./components/chat/ChatMain";
import {BrowserRouter} from "react-router-dom";


function App() {
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
}

export default App;
