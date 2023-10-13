/**************************************************************



***************************************************************/
import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { ErrorBoundary } from "react-error-boundary";

import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/Chat/Chat';
import Login from "./components/Login/Login";
import GlobalContainer from './components/layout/GlobalContainer';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
// import { ErrorFallBack } from "./utils/ErrorFallBack";


function App() {
  // カスタムフックで型定義したuseDispatch
  const dispatch = useAppDispatch();
  
  // カスタムフックでで型定義したuseSelector
  const user = useAppSelector(state => {
    // console.log(state)
    return state.user.user;
  });
  // const { user } = useAppSelector(state => state.user);
  // console.log(user);

  useEffect(() => {
    // onAuthStateChanged ... 認証状態が変わるたびに発火し、ユーザー情報を取得できる
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser); // ユーザー情報が渡ってくる

      if(loginUser){
        // userSliceに通知
        dispatch(login({ 
          uid:   loginUser.uid, // user id
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName
        }));

      } else {
        // ログアウト
        dispatch(logout()); // payloadの設定はなし。
      }
    });

    // クリーンアップ関数...アンマウントした後もonAuthStateChangedが実行されるので止めてメモリリークを防ぐ
    return () => {
      unsubscribe();
    }

  // dispatch で通知を出すたびにuseEffectを発火
  }, [ dispatch ]);

  return (
    <div className="App">
      <GlobalContainer>
        { 
          user ? (
            <>
              {/* <ErrorBoundary FallbackComponent={ ErrorFallBack }>
                <Sidebar />
              </ErrorBoundary> */}
              
              <Sidebar />
              <Home />
            </>
          ) : (
            <Login />
          )
        
        }
        
      </GlobalContainer>
    </div>
  );
}

export default App;
