import {makeAutoObservable} from "mobx";

export default class LeftChatStore {


    constructor() {
        this._chatsList = [
            {
                userId: 2,
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
                userId: 3,
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
                userId: 100,
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
                userId: 3,
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
                userId: 100,
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
                userId: 3,
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
                userId: 100,
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
                userId: 2,
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
                userId: 3,
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
                userId: 100,
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
                userId: 3,
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
                userId: 100,
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
                userId: 3,
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
                userId: 100,
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
        makeAutoObservable(this)
    }

    setChatsList(list){
        this._chatsList = list
    }

    get chatsList(){
        return this._chatsList
    }


}