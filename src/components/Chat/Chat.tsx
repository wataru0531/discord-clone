/**************************************************************

Chat

・ホーム画面のヘッダー、チャット欄、インプット蘭

***************************************************************/
import { Timestamp } from "firebase/firestore";

import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import useSubCollection from "../../hooks/useSubCollection";

export type Message = {
  id?: string,
  timestamp: Timestamp, // firebaseで型定義されている
  message: string,
  user: {
    uid: string,
    photo: string,
    email: string,
    displayName: string,
  }
}

const Chat: React.FC = () => {
  const { channelId, channelName } = useAppSelector(state => state.channel);
  // console.log(channelId);
  // console.log(channelName);

  // 親のコレクション名、ドキュメントid、サブコレクション名
  const { subDocuments: messages } = useSubCollection("channels", channelId, "messages");
  // console.log(messages)

  return (
    <div className="chat">
      <ChatHeader channelName={ channelName } />
      
      <div className="chatMessages">
        { 
          messages.map((message) => {
            // console.log(message); // {timestamp: Timestamp, message: 'こんばんは', user: {…}}

            return <ChatMessage key={ message.id } message={ message } />
          })
        }
      </div>
      
      <ChatInput />
    </div>
  )
  
}

export default Chat;




// // サブコレクションから取得してきたmessagesを格納
  // const [ messages, setMessages ] = useState<Message[]>([]);

  // const { channelId, channelName } = useAppSelector(state => state.channel);
  // // console.log(channelName);

  // useEffect(() => {
  //   // 参照元のサブコレクション
  //   let collectionRef = collection(
  //     db,
  //     "channels",
  //     String(channelId), // ドキュメントのid
  //     "messages"
  //   );

  //   // 日付順にソートする
  //   const collectionRefOrderBy = query(
  //     collectionRef,
  //     orderBy("timestamp", "desc"), // desc...降順(逆から上に) asc...昇順
  //   );

  //   // リアルタイムでドキュメントを取得 → 加工して配列に格納 → mapして出力
  //   onSnapshot(collectionRefOrderBy, (snapshot) => {
  //     // console.log(snapshot.docs); // [QueryDocumentSnapshot]
  //     // [QueryDocumentSnapshot]...firestoreのドキュメントのスナップショット
      
  //     let results: Message[] = [];

  //     snapshot.docs.forEach(doc => {

  //       results.push({
  //         // doc()...[QueryDocumentSnapshot]のデータフィールドを抽出してデータを取得できる
  //         timestamp: doc.data().timestamp,
  //         message: doc.data().message,
  //         user: doc.data().user,
  //       })
  //     });

  //     setMessages(results);
  //   });

  //   // channelIdが切り替わるたびに発火
  // }, [ channelId ]);