/**************************************************************


***************************************************************/
import { Avatar } from "@mui/material";
import { Timestamp } from "firebase/firestore";

import "./ChatMessage.scss";

// インポートするとエラーを吐くので再定義
type ChatMessageProps = {
  message: {
    timestamp: Timestamp, // firebaseで型定義されている型
    message: string,
    user: {
      uid: string,
      photo: string,
      email: string,
      displayName: string,
    }
  }
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // console.log(message); // { timestamp: Timestamp, message: 'こんばんは', user: {…} }

  return(
    <div className="chatMessage">
      <Avatar className="avatar" src={ message.user?.photo } />

      <div className="messageInfo">
        <h4>
          {/* 初回表示はuserがnullなため?でエラーを防ぐ */}
          { message.user?.displayName }
          <span className="messageTimeStamp">
            { new Date(message.timestamp?.toDate()).toLocaleString() }
          </span>
        </h4>
        <p className="chatContent">{ message.message }</p>
      </div>
    </div>
  )
}

export default ChatMessage;