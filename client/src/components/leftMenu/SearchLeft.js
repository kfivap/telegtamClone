import React, {useContext, useEffect, useState} from 'react';
import {searchNick} from "../../http/chatAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const SearchLeft = observer(() => {

    const [searchValue, setSearchValue] = useState('')
    const {leftChats} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(()=>{
        if(searchValue.trim() === ''){
            return
        }
       let timeout =  setTimeout(async ()=>{
          let data = await searchNick(searchValue, user.userId)
           // console.log(toJS(leftChats.chatsList))
           console.log(data.users)
           data.users.forEach(user=>
           user.userPhoto = process.env.REACT_APP_API_URL + user.userPhoto
           )
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