import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LeftChatsStore from "./store/LeftChatsStore";
import UserStore from "./store/UserStore";
import ChatStore from "./store/ChatStore";


export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        leftChats: new LeftChatsStore(),
        user: new UserStore(),
        chat: new ChatStore()
    }}
    >

        <App/>

    </Context.Provider>

    ,
    document.getElementById('root')
);
