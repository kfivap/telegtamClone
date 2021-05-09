import {$authHost, $host} from "./index";



export const getMessages = async (id, offset=0, limit=50) => {

    try {
    const {data} = await $authHost.get(`api/message/getMessages?searchId=${id}&offset=${offset}&limit=${limit}`)

    return data

    } catch (e) {
        console.log(e)
    }
}


