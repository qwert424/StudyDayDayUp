const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  banner: state => state.banner.data,
  avatar: state => state.user.avatar
}
export default getters
