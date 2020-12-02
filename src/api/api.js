// eslint-disable-next-line no-unused-vars
import { get, post } from './axios'
// import axiosService from './axios'

// 登陆api
export const signIn = p => post('/signIn', p);
export const signOut = p => get('/signOut', p);

// 下面是POST形式
// export const signIn = data => {
//     return axiosService({
//         url: "/signIn", // 根据实际接口地址来写
//         method: "post",
//         data
//     });
// };
// 首页
