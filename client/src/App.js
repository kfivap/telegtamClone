import React from 'react'
import NavBar from "./components/navbar/NavBar";
import LeftMenuMain from "./components/leftMenu/LeftMenuMain";
import ChatMain from "./components/chat/ChatMain";


function App() {
    return (
        <div className="App">

            <div className='pageWrap'>
                <NavBar/>
                <div className='flexContainer'>
                    <LeftMenuMain/>
                    <ChatMain/>
                </div>

            </div>
        </div>
    );
}

export default App;
