import { loginApi, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: '',
    // avatar: '',
    userInfo: null,//用户信息
  }
}

const state = getDefaultState()

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
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
        resolve();
      } else {
        reject(resp);
      }
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //     removeToken() // must remove  token  first
  //     resetRouter()
  //     commit('RESET_STATE')
  //     resolve()
  //     }).catch(error => {
  //     reject(error)
  //     })
  //   })
  // },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

