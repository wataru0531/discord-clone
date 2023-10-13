/**************************************************************

コレクション > ドキュメントのサブコレクションを取得するカスタムフック

***************************************************************/
import { useEffect, useState } from "react";
import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebase";

export type Message = {
  id?: string,
  timestamp: Timestamp,
  message: string,
  user: {
    uid: string,
    photo: string,
    email: string,
    displayName: string,
  }
}


const useSubCollection = (
  collectionName: string,    // "channels"
  _channelId: string | null, // id000000000
  subCollectionName: string, // "messages" ... サブコレクション名
) => {

  // サブコレクションから取得してきたmessagesを格納
  const [ subDocuments, setSubDocuments ] = useState<Message[]>([]);
  
  // const { channelId, channelName } = useAppSelector(state => state.channel);

  useEffect(() => {
    // 参照元のサブコレクション
    const collectionRef = collection(
      db,                 // Firestore初期化の変数
      collectionName,     // "channels"
      String(_channelId), // ドキュメントのidを文字列化
      subCollectionName   // "messages"
    );

    // クエリを生成...日付順にソートする
    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc"), // desc...降順(逆から上に) asc...昇順
    );

    // リアルタイムでドキュメントを取得 → 加工して配列に格納 → mapして出力
    const unsubscribe = onSnapshot(collectionRefOrderBy, (snapshot) => {
      // console.log(snapshot.docs); // [QueryDocumentSnapshot]
      // [QueryDocumentSnapshot]...firestoreのドキュメントのスナップショット
      
      let results: Message[] = [];

      snapshot.docs.forEach(doc => {
        // console.log(doc.id);

        // QueryDocumentSnapshotは複雑なオブジェクトだが、.idやdata()メソッドでデータにアクセスできる
        results.push({
          id: doc.id,
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user, // ここはオブジェクト
        })
      });

      setSubDocuments(results);
      // console.log(subDocuments); 
      // {id: 'OTMr5DFKz2zFixOiBqIf', timestamp: Timestamp, message: 'こんにちあ', user: {uid, photo, displayName, email}}
    });

    // クリーンアップ関数
    return () => {
      unsubscribe();
    };

    // channelIdが切り替わるたびに発火
  }, [ _channelId ]);

  return { subDocuments };
}

export default useSubCollection;