import {$authHost, $host} from "./index";



export const searchNick = async (nick, userId) => {
    try {
        const {data} = await $authHost.get(`api/chat/findUsers?searchNick=${nick}&id=${userId}`)

        return data
    } catch (e) {
        console.log(e)
    }

}


export const getChats = async () => {
    try {


    const {data} = await $authHost.get(`api/chat/getChats`)

    return data
    } catch (e) {
        console.log(e)
    }
    }

