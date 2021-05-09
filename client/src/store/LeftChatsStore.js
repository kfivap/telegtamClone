import {makeAutoObservable, toJS} from "mobx";

export default class LeftChatStore {


    constructor() {
        this._chatsList = [
            {
                userId: 2,
                userName: 'Nick Stoyan',
                // userPhoto: 'https://via.placeholder.com/150/24f355',
                time: Date.now(),
                from: 1,
                media: null,
                text: 'Hello',
                // unreadCounter: 5,
                // heRead: false,
                // pinned: true
            },
            {
                userId: 3,
                userName: 'Alex Alex',
                // userPhoto: 'https://via.placeholder.com/150/d32776',
                time: Date.now()-120*1000,
                from: 3,
                media: 'video',
                text: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 55,
                userName: 'Donal Trump',
                // userPhoto: 'https://via.placeholder.com/150/66b7d2',
                time: Date.now()-500*1000,
                from: 100,
                media: null,
                message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
                unreadCounter: 0,
                heRead: true,
                pinned: false
            },



        ]
        this._isSearch = false
        makeAutoObservable(this)
    }

    setChatsList(list){
        this._chatsList = list
    }
    setIsSearch(boolean){
        this._isSearch = boolean
    }

    setUnreadCounterByChatId(chatId, number){
       let chatList =  toJS(this._chatsList)
        // for(let i; i<chatList.length; i++){
        //
        // }

        chatList.forEach(chat=>{
            if(chat.chatId=== chatId){
                chat.unreadCounter = chat.unreadCounter+number
            }
            return chat
        })

        // chatList[ind].unreadCounter -= 1
        // console.log(chatList[ind].unreadCounter)
        // console.log(chatList)
        this.setChatsList(chatList)
    }

    get chatsList(){
        return this._chatsList
    }

    get isSearch(){
        return this._isSearch
    }


}