import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password, nick) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: "ADMIN", nick})
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    console.log(data)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    return data
}


export const getNames = async (arr) => {
    const {data} = await $host.get(`api/user/userNames?idList=${arr}`)

    return data
}


export const getAvatar = async (id) => {
    const {data} = await $host.get(`api/user/avatar?userId=${id}`)

    return data
}


export const editProfileAPI = async (edited) => {

    // console.log(bio)
    const {data} = await $authHost.put(`api/user/edit`, edited)
    return data

}

