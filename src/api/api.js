import axiosService from './axios'

export async function signIn(data) {
    return axiosService({
        url: '/signIn',
        method: 'post',
        params: data
    })
}

export async function signOut() {
    return axiosService({
        url: '/signOut',
        method: 'get'
    })
}

export async function getUserList(param) {
    console.log(param)
    return axiosService({
        url: '/user/list',
        method: 'post',
        data: param
    })
}
