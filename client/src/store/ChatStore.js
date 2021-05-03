import {makeAutoObservable, toJS} from "mobx";

export default class ChatStore {
    constructor() {
        this._chatWith = null
        this._chatAvatar = 'https://via.placeholder.com/150/6a0f83'
        this._chatWithName = ''
        this._messageList = [
            {
                from: 0,
                text: 'Welcome to new Messenger',
                media: null,
                read: false,
                // date: '18:45'
            },
            {
                from: 0,
                text: 'To start messaging, find user on the left side',
                media: null,
                read: false,
                // date: '18:45'
            },
            {
                from: 0,
                text: 'Enjoy!',
                media: null,
                read: false,
                // date: '18:45'
            },

        ]
        this._cachedMessagesList = {}
        makeAutoObservable(this)
    }

    setChatWith(id){
        this._chatWith = id
    }

    setChatAvatar(src){
        this._chatAvatar = src
    }
    pushMessageList(messages){
        if(this._chatWith === null){
            return
        }
        if(messages.event === 'message'){
            this._messageList = [...toJS(this._messageList), messages]
        }
    }
    setCacheMessages(chatWith){
        this._cachedMessagesList[chatWith] = this.messageList

    }


    setMessageList(messages){
        this._messageList = messages
    }

    setChatWithName(name){
        this._chatWithName = name
    }

    get chatWith(){
        return this._chatWith
    }
    get chatAvatar(){
        return this._chatAvatar
    }
    get messageList(){
        return this._messageList
    }
    get chatWithName(){
        return this._chatWithName
    }
    get cachedMessagesList(){
        return this._cachedMessagesList
    }

}