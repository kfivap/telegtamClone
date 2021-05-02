import {$authHost, $host} from "./index";



export const searchNick = async (nick) => {
    const {data} = await $authHost.get(`api/chat/findUsers?searchNick=${nick}`)

    return data
}


export const getChats = async () => {
    const {data} = await $authHost.get(`api/chat/getChats`)

    return data
}

