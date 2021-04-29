import {makeAutoObservable} from "mobx";

export default class ChatStore {
    constructor() {
        this._chatWith = null
        this._chatAvatar = 'https://via.placeholder.com/150/6a0f83'
        makeAutoObservable(this)
    }

    setChatWith(id){
        this._chatWith = id
    }

    setChatAvatar(src){
        this._chatAvatar = src
    }

    get chatWith(){
        return this._chatWith
    }
    get chatAvatar(){
        return this._chatAvatar
    }


}