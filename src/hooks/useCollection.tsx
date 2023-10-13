/**************************************************************

コレクションの中のドキュメントを全て取得するカスタムフック

***************************************************************/
import { useEffect, useState } from "react";
import { DocumentData, Query, collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../firebase";

// channelコレクションのデータの型
// // {id: '1R4fCR2CPWd7wbAzINYL', channelData: {channelName: 'チャンネル28'}}
export type Channels = {
  id: string,
  channelData: DocumentData,
}


const useCollection = (collectionName: string) => { // collectionName ... コレクション名
  //
  const [ documents, setDocuments ] = useState<Channels[]>([]);

  // channelsコレクションにアクセスする参照
  const collectionRef: Query<DocumentData> = query(collection(db, collectionName)); 

  useEffect(() => {
    // onSnapshot...リアルタイムでデータ取得
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      // console.log(querySnapshot) // QuerySnapshot{...複雑なプロパティ}

      const channelsResults: Channels[] = [];

      querySnapshot.docs.forEach((doc) => {
        // console.log(doc); // doc.idとすると_key()が呼ばれて、idが取得できるようにクラスで記述されている
        // console.log(doc.id);
        // console.log(doc.data())

        // QuerySnapshotは複雑なオブジェクトだが、.idやdata()メソッドでデータを取得できる
        channelsResults.push({
          id: doc.id, // ドキュメントのid
          channelData: doc.data(), // idに紐づいたデータのオブジェクト
        })
      });

      setDocuments(channelsResults); // データの状態を保つ
      // console.log(documents); // {id: '1R4fCR2CPWd7wbAzINYL', channelData: {channelName: 'チャンネル28'}}
    });

    // クリーンアップ関数
    return () => {
      unsubscribe();
    }

    // console.log(documents) // {id: '8WpITUwBhn7KsLZ0oUDA', channel: {…}}, {id: '8WpITUwBhn7KsLZ0oUDA', channel: {…}}
  }, [])

  return { documents };
}

export default useCollection;