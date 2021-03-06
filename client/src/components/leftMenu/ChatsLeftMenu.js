import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import ChatPreview from "./ChatPreview";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {getChats} from "../../http/chatAPI";
import {getNames} from "../../http/userAPI";

const ChatsLeftMenu = observer(() => {

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


    const {leftChats, user} = useContext(Context)

    useEffect(() => {

        if(leftChats.isSearch){
            return
        }


        async function fetchData() {

            let data = await getChats()

            if (data.rows.count === 0) {
                return
            }
        // console.log(data)

            data.rows.forEach(row => {
                delete row.createdAt
                delete row.updatedAt
                    return row.lastMessage = JSON.parse(row.lastMessage)
                }
            )
            // console.log(data)


            function flatObject(source, target) {
                Object.keys(source).forEach(k => {
                    if (Array.isArray(source[k])) {
                        source[k].forEach(function iter(a) {
                            if (Array.isArray(a)) {
                                a.forEach(iter);
                                return;
                            }
                            if (a !== null && typeof a === 'object') {
                                if ('name' in a || 'value' in a) {
                                    'name' in a && 'value' in a && flatObject({[a.name]: a.value}, target);
                                    return;
                                }
                                flatObject(a, target);
                            }
                        });
                        return;
                    }
                    if (source[k] !== null && typeof source[k] === 'object') {
                        flatObject(source[k], target);
                        return;
                    }
                    target[k] = source[k];
                });
            }

            let target = {};



            let editedArray = []
            let idToNamesArr = []

            data.rows.map(row => {
                let target = {};
                flatObject(row, target);
                target.usersArray = row.usersArray


                let chatWith = row.usersArray.filter(id => id !== user.userId)


                target.userId = chatWith[0]

                if (!chatWith[0]) {
                    target.userId = user.userId
                }

                let unreadIndex = row.usersArray.findIndex(elem => elem === user.userId)


                let unreadCounter = row.unread[unreadIndex]

                target.unreadCounter = unreadCounter
                // target.updatedAt = row.lastMessageTime
// console.log(target)
                idToNamesArr.push(target.userId)
                editedArray.push(target)
            })


            // console.log(editedArray)
            let nickNames = await getNames(idToNamesArr)
            // console.log(nickNames)

            for (let i = 0; i < nickNames.length; i++) {
                for (let j = 0; j < editedArray.length; j++) {
                    if (nickNames[i].userId === editedArray[j].userId) {
                        editedArray[j].userName = nickNames[i].userName
                        editedArray[j].userPhoto = nickNames[i].avatar
                        break
                    }
                }

            }


        // console.log(editedArray)
            leftChats.setChatsList(editedArray)
            // console.log(editedArray)
        }

        fetchData()


    }, [leftChats.isSearch])




    return (
        <div className={'chatsFull'} style={{height: height - 108}}>

            {leftChats.chatsList.map((dialog, index) =>
                <ChatPreview
                    dialog={dialog}
                    key={index}
                />
            )}


        </div>
    )
        ;
})

export default ChatsLeftMenu;