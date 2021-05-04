import {makeAutoObservable} from "mobx";

export default class LeftChatStore {


    constructor() {
        this._chatsList = [
            {
                userId: 2,
                userName: 'Nick Stoyan',
                userPhoto: 'https://via.placeholder.com/150/24f355',
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
                userPhoto: 'https://via.placeholder.com/150/d32776',
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
                userPhoto: 'https://via.placeholder.com/150/66b7d2',
                time: Date.now()-500*1000,
                from: 100,
                media: null,
                message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
                unreadCounter: 0,
                heRead: true,
                pinned: false
            },
            {
                userId: 34,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/4d564d',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: true,
                pinned: false
            },
            {
                userId: 1050,
                userName: 'Pavel Durov',
                userPhoto: 'https://via.placeholder.com/150/501fe1',
                time: Date.now()-500*1000,
                sender: 100,
                media: null,
                message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
                unreadCounter: 100,
                heRead: true,
                pinned: false
            },            {
                userId: 153,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/6a0f83',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 15100,
                userName: 'Serge Mavrodi',
                userPhoto: 'https://via.placeholder.com/150/5e12c6',
                time: Date.now()-500*1000,
                sender: 1,
                media: 'blank.txt',
                message: null,
                unreadCounter: 100,
                heRead: false,
                pinned: false
            },
            {
                userId: 2787,
                userName: 'Nick Stoyan',
                userPhoto: 'https://via.placeholder.com/150/24f355',
                time: Date.now(),
                sender: 1,
                media: null,
                message: 'Hello',
                unreadCounter: 5,
                heRead: false,
                pinned: true
            },
            {
                userId: 394,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/d32776',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 45,
                userName: 'Donal Trump',
                userPhoto: 'https://via.placeholder.com/150/66b7d2',
                time: Date.now()-500*1000,
                sender: 100,
                media: null,
                message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
                unreadCounter: 0,
                heRead: true,
                pinned: false
            },
            {
                userId: 484,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/4d564d',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: true,
                pinned: false
            },
            {
                userId: 10650,
                userName: 'Pavel Durov',
                userPhoto: 'https://via.placeholder.com/150/501fe1',
                time: Date.now()-500*1000,
                sender: 100,
                media: null,
                message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
                unreadCounter: 100,
                heRead: true,
                pinned: false
            },            {
                userId: 3654,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/6a0f83',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 105640,
                userName: 'Serge Mavrodi',
                userPhoto: 'https://via.placeholder.com/150/5e12c6',
                time: Date.now()-500*1000,
                sender: 1,
                media: 'blank.txt',
                message: null,
                unreadCounter: 100,
                heRead: false,
                pinned: false
            },
            {
                userId: 564,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/6a0f83',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 18700,
                userName: 'Serge Mavrodi',
                userPhoto: 'https://via.placeholder.com/150/5e12c6',
                time: Date.now()-500*1000,
                sender: 1,
                media: 'blank.txt',
                message: null,
                unreadCounter: 100,
                heRead: false,
                pinned: false
            },   {
                userId: 37865,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/6a0f83',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 112300,
                userName: 'Serge Mavrodi',
                userPhoto: 'https://via.placeholder.com/150/5e12c6',
                time: Date.now()-500*1000,
                sender: 1,
                media: 'blank.txt',
                message: null,
                unreadCounter: 100,
                heRead: false,
                pinned: false
            },
            {
                userId: 3546,
                userName: 'Alex Alex',
                userPhoto: 'https://via.placeholder.com/150/6a0f83',
                time: Date.now()-120*1000,
                sender: 3,
                media: 'video',
                message: null,
                unreadCounter: 0,
                heRead: false,
                pinned: false
            },
            {
                userId: 15600,
                userName: 'Serge Mavrodi',
                userPhoto: 'https://via.placeholder.com/150/5e12c6',
                time: Date.now()-500*1000,
                sender: 1,
                media: 'blank.txt',
                message: null,
                unreadCounter: 100,
                heRead: false,
                pinned: false
            }

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

    get chatsList(){
        return this._chatsList
    }

    get isSearch(){
        return this._isSearch
    }


}