/**************************************************************

・カスタムフック

・useDispatch、useSelector の型定義をしたフック

***************************************************************/
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


import { RootState } from "./store";
// type RootState = {
//   user: InitialUserState;
//   channel: InitialChannelState;
// }

import { AppDispatch } from "./store";
// type AppDispatch = ThunkDispatch<{
//   user: InitialUserState;
//   channel: InitialChannelState;
// }, undefined, AnyAction> & Dispatch<AnyAction>


// useSelectorの型指定
// TypedUseSelectorHookでuseSelectorの型を使用し、それをuseAppSelectorとして定義。
// これにより、useAppSelectorを使用する際にはRootState型を指定してReduxストアの状態に型安全にアクセスできる
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useDispatchの型指定
// () => AppDispatch ... 無名関数の型指定
// useDispatchを参照するだけなので、()をつけて実行する必要はない。
// ここではuseDispatchは、参照可能なオブジェクト。
export const useAppDispatch: () => AppDispatch = useDispatch;