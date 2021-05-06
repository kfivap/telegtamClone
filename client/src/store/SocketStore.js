import {makeAutoObservable} from "mobx";

export default class SocketStore {

    constructor() {
        this._message = {}
        this._sending = false
        this._reading = false

        makeAutoObservable(this)
    }

    setMessage(object){
        this._message = object
    }
    setSending(boolean){
        this._sending = boolean
    }
    setReading(boolOrNum){
        this._reading = boolOrNum
    }



    get message(){
        return this._message
    }
    get sending(){
        return this._sending
    }
    get reading(){

        return this._reading
    }
}


