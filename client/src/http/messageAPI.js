import {$authHost, $host} from "./index";



export const getMessages = async (id) => {
    const {data} = await $authHost.get(`api/message/getMessages?searchId=${id}`)

    return data
}


