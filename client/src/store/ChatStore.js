import {makeAutoObservable, toJS} from "mobx";

export default class ChatStore {
    constructor() {
        this._chatWith = null
        this._chatAvatar = 'https://via.placeholder.com/150/6a0f83'
        this._chatWithName = ''
        this._messageList = [
            {
                authorId: 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate ducimus eum laboriosam molestias nam sapiente voluptatem? Aspernatur aut dolores eum expedita ipsa iste maiores provident quisquam rem? Officia, rem.',
                media: null,
                read: false,
                date: '18:45'
            },
            {
                authorId: 1,
                text: 'he22llo',
                media: null,
                read: true,
                date: '18:45'
            },
            {
                authorId: 2,
                text: 'hello',
                media: 'video.mp4',
                read: false,
                date: '18:45'
            }
        ]
        makeAutoObservable(this)
    }

    setChatWith(id){
        this._chatWith = id
    }

    setChatAvatar(src){
        this._chatAvatar = src
    }

    pushMessageList(messages){
        // console.log(toJS(this._messageList))
        // console.log(messages)
        if(messages.event === 'message'){
            this._messageList = [...toJS(this._messageList), messages]
        }


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


}