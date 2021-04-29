import React from 'react';
import './leftMenu.css'
import SearchLeft from "./SearchLeft";
import ChatsLeftMenu from "./ChatsLeftMenu";

const LeftMenuMain = () => {
    return (
        <div className={'mainLeft'}>
            {/*Main left*/}
            <SearchLeft/>
            <ChatsLeftMenu/>


        </div>
    );
};

export default LeftMenuMain;