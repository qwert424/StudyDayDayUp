import { loginApi, getInfoApi } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),//Token
    userInfo: null,//用户信息
    avatar: "/static/avatar/happy.gif"//头像
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, payload) => {
    state.userInfo = payload
  }
}

const actions = {
  // user login 登录验证
  login({ commit }, userInfo) {
    return new Promise(async (resolve, reject) => {
      const resp = await loginApi(userInfo);
      const { data } = resp;
      if (data) {
        commit('SET_USERINFO', data)
        commit('SET_TOKEN', getToken())
        resolve();
      } else {
        reject(resp);
      }
    })
  },

  // get user info token恢复用户信息 whoami
  getInfo({ commit, token }) {
    return new Promise(async (resolve, reject) => {
      const resp = await getInfoApi(token);
      const { data } = resp;
      if (data) {
        commit('SET_USERINFO', data)
        resolve();
      } else {
        reject(resp);
      }
    })
  },

  // user logout 退出登录
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve();
    })
  },

  // remove token 删除无效本地token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

