import {$authHost, $host} from "./index";



export const searchNick = async (nick, userId) => {
    const {data} = await $authHost.get(`api/chat/findUsers?searchNick=${nick}&id=${userId}`)

    return data
}


export const getChats = async () => {
    const {data} = await $authHost.get(`api/chat/getChats`)

    return data
}

