import React from 'react';
import './leftMenu.css'
import SearchLeft from "./SearchLeft";
import ChatsLeftMenu from "./ChatsLeftMenu";
import {observer} from "mobx-react-lite";

const LeftMenuMain = observer(() => {
    return (
        <div className={'mainLeft'}>
            {/*Main left*/}

            <SearchLeft/>
            <ChatsLeftMenu/>


        </div>
    );
})

export default LeftMenuMain;