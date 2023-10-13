/**************************************************************



***************************************************************/
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import channelReducer from "../features/channelSlice";

export const store = configureStore({
  reducer: {
    // この名前でuseSelectorで取得
    user: userReducer,
    channel: channelReducer,
  },
});


// useSelectorの型
// Reduxのストアオブジェクトから状態全体の型情報を取得
// RootState...store.getStateの戻り値型を取得し、それをRootState型として定義
// RootState型はReduxストア全体の状態の型を表す。
export type RootState = ReturnType<typeof store.getState>;


// useDispatchの型
// typeof ... store.dispatchの型を取得している
export type AppDispatch = typeof store.dispatch;

