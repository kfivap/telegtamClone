import {makeAutoObservable} from "mobx";

export default class UserStore {

    constructor() {
        // this._isAuth = false
        // this._userId = null
        this._isAuth = false
        this._userId = 1
        this._userAvatar = 'https://via.placeholder.com/150/5e12c6'
        this._userName = 'Kirill Kirill'

        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUserId(id){
        this._userId = id
    }
    setUserAvatar(src){
        this._userAvatar = src
    }
    setUserName(name){
        this._userName = name
    }


    get isAuth(){
        return this._isAuth
    }
    get userId(){
        return this._userId
    }
    get userAvatar(){
        return this._userAvatar
    }
    get userName(){
        return this._userName
    }


}