import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password, nick) => {
    try {
        const {data} = await $host.post('api/user/registration', {email, password, role: "ADMIN", nick})
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }

}

export const login = async (email, password) => {
    try {
        const {data} = await $host.post('api/user/login', {email, password})
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        console.log(data)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }

}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        return data
    } catch (e) {
        console.log(e)
    }

}


export const getNames = async (arr) => {
    try {
        const {data} = await $host.get(`api/user/userNames?idList=${arr}`)

        return data
    } catch (e) {
        console.log(e)
    }

}


export const getAvatar = async (id) => {
    try {
        const {data} = await $host.get(`api/user/avatar?userId=${id}`)

        return data
    } catch (e) {
        console.log(e)
    }

}


export const editProfileAPI = async (edited) => {

    // console.log(bio)
    try {
        const {data} = await $authHost.put(`api/user/edit`, edited)
        return data
    } catch (e) {
        console.log(e)
    }


}

