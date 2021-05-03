import {$authHost, $host} from "./index";



export const getMessages = async (id, offset=0) => {
    const {data} = await $authHost.get(`api/message/getMessages?searchId=${id}&offset=${offset}&limit=10`)

    return data
}


