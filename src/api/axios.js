/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@/router'
import QS from 'qs'
import {message} from 'ant-design-vue'
import {isArray} from "../utils/validate";

let loadingInstance

const axiosService = axios.create({
    baseURL: 'http://localhost:8088/',
    withCredentials: true,
    timeout: 10000
})

// request拦截器 ==> 对请求参数进行处理
axiosService.interceptors.request.use(
    config => {
        // if (store.getters['user/accessToken']) {
        //     config.headers[tokenName] = store.getters['user/accessToken']
        // }
        if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
            config.data = QS.stringify(config.data)
        }
        // 加载动画
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// respone拦截器 ==> 对响应做处理
axiosService.interceptors.response.use(
    response => {
        if (loadingInstance) loadingInstance.close()
        const successCode = ['0000', '0001']
        const {data, config} = response
        const {code, msg} = data
        // 操作正常Code数组
        const codeVerificationArray = isArray(successCode)
            ? [...successCode]
            : [...[successCode]]
        // 是否操作正常
        if (codeVerificationArray.includes(code)) {
            return data
        } else {
            handleCode(code, msg)
            return Promise.reject(
                'vue-admin-beautiful请求异常拦截:' +
                JSON.stringify({url: config.url, code, msg}) || 'Error'
            )
        }
    },
    error => {
        if (loadingInstance) loadingInstance.close()
        const {response, message} = error
        if (error.response && error.response.data) {
            const {status, data} = response
            handleCode(status, data.msg || message)
            return Promise.reject(error)
        } else {
            let {message} = error
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            }
            if (message.includes('timeout')) {
                message = '后端接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                message = '后端接口' + code + '异常'
            }
            message.error(message || `后端接口未知异常`)
            return Promise.reject(error)
        }
    }
)

/**
 * 处理code异常
 * @param code
 * @param msg
 */
const handleCode = (code, msg) => {
    switch (code) {
        case 401:
            message.error(msg || '登录失效')
            // store.dispatch('user/resetAll').catch(() => {})
            break
        case 403:
            router.push({path: '/401'}).catch(() => {
            })
            break
        default:
            message.error(msg || `后端接口${code}异常`)
            break
    }
}

export default axiosService;