import React, {useContext, useEffect, useState} from 'react';
import {searchNick} from "../../http/chatAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const SearchLeft = observer(() => {

    const [searchValue, setSearchValue] = useState('')
    const {leftChats} = useContext(Context)

    useEffect(()=>{
        if(searchValue.trim() === ''){
            // return
        }
       let timeout =  setTimeout(async ()=>{
          let data = await searchNick(searchValue)
           // console.log(toJS(leftChats.chatsList))
           leftChats.setChatsList(data.users)
           // console.log(toJS(leftChats.chatsList))
        }, 500)

        return(()=> clearTimeout(timeout))
    }, [searchValue])

    return (
        <div className={'searchLeft'}>
            <input className={'searchLeftInput'}
            placeholder={'search'}
                   onChange={e=> setSearchValue(e.target.value)}
                   value={searchValue}
            />
        </div>
    );
})

export default SearchLeft;