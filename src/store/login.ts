import {login, register, userInfo} from "@/api/Request/user";

const state = {
  code: '',
  //默认从本地存储中初始化
  token: localStorage.getItem('token'),
  userInfo: localStorage.getItem('userInfo')
};
const mutations = {
  //状态码变更
  SETCODE(state: any, code: any) {
    state.code = code
  },
  //token变更
  SETTOKEN(state: any, token: any) {
    state.token = token
  },
  //用户信息变更
  SETINFO(state: any, userInfo: any) {
    state.userInfo = userInfo
  }
};
const actions = {
  //用户注册
  async register({commit}: any, data: any) {
    let res = await register(data)
    //提交状态码
    commit('SETCODE', res.data.code)
  },

  //用户登录
  async login({commit}: any, data: any) {
    let res1 = await login(data)
    //本地存储token
    localStorage.setItem('token', res1.data.data)
    //提交状态码、token
    commit('SETCODE', res1.data.code)
    commit('SETTOKEN', localStorage.getItem('token'))

    let res2 = await userInfo();
    //提交用户信息
    commit('SETINFO', res2.data.data)
    console.log('head派发action提交userInfo后：',state.userInfo)
    console.log(state.token)
    console.log(state.userInfo)
  },

  //用户注销
  logout({commit}: any) {
    //移除token
    localStorage.clear()
    //仓库刷新
    commit('SETTOKEN', '')
    commit('SETINFO', '')
  },

  //查询用户信息
  async userInfo({commit}: any) {
    let res = await userInfo();
    //提交用户信息
    commit('SETINFO', res.data.data)
    console.log('head派发action提交userInfo后：',state.userInfo)
  }

}
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}