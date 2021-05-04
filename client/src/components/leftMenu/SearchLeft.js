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
            leftChats.setIsSearch(false)
            return
        }

       let timeout =  setTimeout(async ()=>{
          let data = await searchNick(searchValue, user.userId)

           // console.log(toJS(leftChats.chatsList))
           // console.log(data)
           data.users.forEach(user=>
           user.userPhoto = process.env.REACT_APP_API_URL + user.userPhoto
           )
           data.chats.forEach(chat=>{
               let userId
               for(let i=0; i<chat.usersArray.length; i++){

                   // console.log(chat.usersArray)
                   if(chat.usersArray[i] !== user.userId){
                       userId = chat.usersArray[i]
                       break
                   } else {
                       userId = user.userId
                   }
               }
               return (
                   chat.userId =userId,
                   chat.lastMessage = JSON.parse(chat.lastMessage)
               )

               }
           )

           console.log(data)

           for(let i=0; i<data.users.length; i++){
               for(let j=0; j<data.chats.length; j++){
                   if(data.users[i].userId === data.chats[j].userId){
                      data.users[i].createdAt = data.chats[j].lastMessage.createdAt
                       data.users[i].text = data.chats[j].lastMessage.text
                       data.users[i].media = data.chats[j].lastMessage.media



                       break
                   }
               }
           }

           leftChats.setChatsList(data.users)
           leftChats.setIsSearch(true)
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