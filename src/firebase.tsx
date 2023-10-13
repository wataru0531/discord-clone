/**************************************************************

FirebaseのSDK(Sofrware Development Kit)
...Firebaseのさまざまな機能やサービス(AutherntificationやCloudFirebase)を使うための初期化

・ここではAutherntificationとCloudFirestoreを使うが、他のFirebaseのサービスを
使うなら、必要なSDKを追加していく

注意....firebase/firestore/liteは軽量版みたいなので、必ずfirebase/firestoreからインポートする

***************************************************************/
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Cloud Firestore(データベース)
import { GoogleAuthProvider, getAuth } from "firebase/auth"; // Aithentification((認証))


const firebaseConfig = {
  apiKey: "AIzaSyD7FMKZAsGEuYSZ4y5kD1mMzUaqRJEhbe4",
  authDomain: "discord-clone-22f09.firebaseapp.com",
  projectId: "discord-clone-22f09",
  storageBucket: "discord-clone-22f09.appspot.com",
  messagingSenderId: "369671655217",
  appId: "1:369671655217:web:8522d72a290514e0652a10",
  measurementId: "G-L4TKQNL7WV"
};

// 初期化
const app = initializeApp(firebaseConfig); // Firebaseへのアクセスがアクセスが可能となる
// const analytics = getAnalytics(app);       // Firebaseに対してのアナリティクスの設定

export const db = getFirestore(app); // Firestoreの初期化

export const auth = getAuth(app);    // 認証
export const provider = new GoogleAuthProvider(); // Googleでの認証のためのプロバイダー

