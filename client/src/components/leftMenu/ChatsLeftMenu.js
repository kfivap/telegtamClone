import React, {useContext, useLayoutEffect, useState} from 'react';
import ChatPreview from "./ChatPreview";
import {Context} from "../../index";

const ChatsLeftMenu = () => {

    // const [height, setHeight] = useState()

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


    const {leftChats} = useContext(Context)

    return (
        <div className={'chatsFull'} style={{height: height-108}}>

            {leftChats.chatsList.map((dialog, index)=>
                <ChatPreview
                    dialog={dialog}
                    key={index}
                />
                )}


        </div>
)
    ;
};

export default ChatsLeftMenu;