import {makeAutoObservable} from "mobx";

export default class ChatStore {
    constructor() {
        this._chatWith = null
        makeAutoObservable(this)
    }

    setChatWith(id){
        this._chatWith = id
    }

    get chatWith(){
        return this._chatWith
    }


}