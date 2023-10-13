/**************************************************************

ログインページ

***************************************************************/
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

import "./Login.scss";
import { auth, provider } from "../../firebase";


const Login = () => {

  const signIn = () => {
    // ポップアップを出しながら認証
    signInWithPopup(auth, provider).catch((error) => {
      alert(error.message);
    })
  }

  return(
    <div className="login">
      <div className="loginBlock">
        <div className="loginLogo">
          <img src="./discordIcon.png" alt="" />
        </div>

        <div className="loginBtn">
          <Button onClick={() => signIn() }>Login</Button>
        </div>
      </div>

    </div>
  )
}

export default Login;
