import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const actions = {}
const mutations = {
  login(state, token) {
    localStorage.setItem('token', token)
    // 把登录的用户保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    axios.post("/login/getUserInfoByToken", {token: token})
      .then(response => {
        if (response.data.code == 0) {
          this.logout()
        } else if (response.data.code == 1) {
          state.user = response.data.data;
          localStorage.setItem('user', response.data.data)
        }
      })
    state.isLogin = true
  },
  logout(state) {
    state.user = null;
    localStorage.setItem('user', null)
    //销毁token
    axios.get("/login/destroyUserToken", {params:{userToken: localStorage.getItem("token")}})
      .then(response => {
        if (response.data.code == 1) {
          console.log("注销token："+localStorage.getItem("token")+"成功!")
          localStorage.setItem('token', null)
        } else{
          console.log("注销token："+localStorage.getItem("token")+"失败!")
          localStorage.setItem('token', null)
        }
      })
    state.isLogin = false
  }
}
const state = {
  user: null,
  token: null,
  isLogin: false
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isLogin: (state) => state.isLogin
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store
