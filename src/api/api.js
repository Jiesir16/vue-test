// eslint-disable-next-line no-unused-vars
import { get, post } from './axios'

// 登陆api
export const signIn = p => post('/signIn', p);