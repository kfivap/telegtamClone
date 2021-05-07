import React from 'react';
import {observer} from "mobx-react-lite";

const UnreadMarker = observer(({message}) => {

    return (
        <div className={'unreadMarker'}
        hidden={message.read}
        > </div>
    );
})

export default UnreadMarker;