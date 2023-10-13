/**************************************************************

ログインしたユーザーに関するスライス...
App、sidebarで使用

***************************************************************/
import { createSlice } from "@reduxjs/toolkit";

import { InitialUserState } from "../Types";

// ユーザーの初期値
const initialState: InitialUserState = {
  user: null
}


export const userSlice = createSlice({
  name: "user", // この名前は、actionオブジェクトの名前となる
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      // console.log(action); // {type: 'user/login', payload: {…}}
      // state ... initialState のこと
      // payload ... { uid, photo, email, displayName }
      
      state.user = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
    }
  }
});

// console.log(userSlice)

// action ... action名とreducer名は同じなので注意
export const { login, logout } = userSlice.actions;

// Reducer
export default userSlice.reducer;