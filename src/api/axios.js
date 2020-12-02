/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
// import QS from 'qs';
// import router from '@/router'
// import store from '../store/index'
import { message } from 'ant-design-vue'

const axiosService = axios.create({
    baseURL:'http://localhost:8088/',
    withCredentials:true,
    timeout:10000
})

// request拦截器 ==> 对请求参数进行处理
axiosService.interceptors.request.use(
    config =>{
        // 后续再做
        return config;
    },
    error => {
        // 处理请求错误
        Promise.reject(error).then(r => {
            console.log(r);
            // Message.error('出错了啊');
        });
    }
)

// respone拦截器 ==> 对响应做处理
axiosService.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            console.log(response.status);
            return Promise.reject(new Error(response || "Error"))
        }
        return response;
    },
    error => {
        // eslint-disable-next-line no-debugger
        // debugger
        // console.log(error.toJSON());
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 400:
                    console.log("参数错误")
                    return Promise.reject('参数错误')
            }
        } else {
            // Message.error('wocao，未知错误');
        }
        return Promise.reject(error)
    }
)

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
// axios.interceptors.request.use(
//     config => {
//         // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//         const token = store.state.token;
//         token && (config.headers.Authorization = token);
//         return config;
//     }, error => {
//         return Promise.error(error);
//     })
//
// // 响应拦截器
// axios.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return Promise.resolve(response);
//         }
//     },
//         // 服务器状态码不是200的情况
//     error => {
//         Message.error("asd");
//         console.log(error.response.status);
//         if (error.response.status) {
//             switch (error.response.status) {
//                 case 400:
//                     this.$message.error("asd");
//                     router.replace({
//                         path: '/signIn',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     });
//                     break;
//                 // 401: 未登录
//                 // 未登录则跳转登录页面，并携带当前页面的路径
//                 // 在登录成功后返回当前页面，这一步需要在登录页操作。
//                 case 401:
//                     router.replace({
//                         path: '/signIn',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     });
//                     break;
//                 // 403 token过期
//                 // 登录过期对用户进行提示
//                 // 清除本地token和清空vuex中token对象
//                 // 跳转登录页面
//                 case 403:
//                     this.$message.error({
//                         message: '登录过期，请重新登录',
//                         duration: 1000,
//                         forbidClick: true
//                     });
//                     // 清除token
//                     localStorage.removeItem('token');
//                     store.commit('loginSuccess', null);
//                     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//                     setTimeout(() => {
//                         router.replace({
//                             path: '/signIn',
//                             query: {
//                                 redirect: router.currentRoute.fullPath
//                             }
//                         });
//                     }, 1000);
//                     break;
//                 // 404请求不存在
//                 case 404:
//                     this.$message.error({
//                         message: '网络请求不存在',
//                         duration: 1500,
//                         forbidClick: true
//                     });
//                     break;
//                 // 其他错误，直接抛出错误提示
//                 default:
//                     this.$message.error({
//                         message: error.response.data.message,
//                         duration: 1500,
//                         forbidClick: true
//                     });
//             }
//             return Promise.reject(error.response);
//         }
//     });

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axiosService.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return axiosService({
        url: url, // 根据实际接口地址来写
        method: "post",
        data: params
    }).catch(error => {
        message.error(error)
    })
}

export default axiosService;