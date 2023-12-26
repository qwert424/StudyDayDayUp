import { createSlice } from '@reduxjs/toolkit'

// 仓库默认值
const initialState = {
    // 是否登录
    isLogined: false,
    // 用户信息
    userInfo: {}
}

// 仓库切片
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // 登录
        login(state, action) {
            state.isLogined = true;
            state.userInfo = action.payload;
        },
        // 登出
        logout(state) {
            state.isLogined = false;
            state.userInfo = {};
        }
    },
})


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;