/**************************************************************



***************************************************************/
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { CollectionReference, DocumentData, DocumentReference, addDoc, collection, serverTimestamp } from "firebase/firestore";


import "./ChatInput.scss";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";


const ChatInput = () => {
  // inputのテキスト
  const [ inputText, setInputText ] = useState<string>("");
  const onChangeSetInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  // チャンネルのIdを取得
  const { channelId } = useAppSelector(state => state.channel);
  // console.log(channelId)

  // ユーザー
  const { user } = useAppSelector(state => state.user);
  // console.log(user); // 

  // フォーム送信 Firestoreのサブコレクションにメッセージ情報を挿入
  const onSubmitSetMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // データベース、コレクション名、ドキュメントのid、サブコレクション名
    // channelIdはstring型にする
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels", 
      String(channelId), 
      "messages"
    );

    const docRef: DocumentReference<DocumentData>  = await addDoc(collectionRef, {
      // id ... idは自動で付与される
      message:    inputText,
      timestamp:  serverTimestamp(), // firebaseで用意されている関数
      user: user,
    })

    // console.log(docRef) // DocumentReference {converter: null, _key: DocumentKey, type: 'document', firestore: Firestore}
    
    setInputText("");
  }

  return(
    <div className="chatInput">
      <AddCircleOutlineIcon className="addCircleOutlineIcon" />
      <form 
        className="chatInputForm"
        onSubmit={ onSubmitSetMessage }
      >
        <input 
          type="text" 
          placeholder="メッセージを送信"
          value={ inputText }
          onChange={ onChangeSetInputText }
        />

        <button>送信</button>
      </form>

      <div className="chatInputIcons">
        <CardGiftcardIcon />
        <GifIcon />
        <InsertEmoticonIcon />
      </div>
    </div>
  )
}

export default ChatInput;
