/**************************************************************

サイドバー

***************************************************************/
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

import "./Sidebar.scss";
import SidebarChannel from './SidebarChannel';
import { useAppSelector } from '../../app/hooks';
import { auth, db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import useCollection from "../../hooks/useCollection";


const Sidebar = () => {
  // ログインしているユーザー情報を取得
  const { user } = useAppSelector(state => state.user);
  // console.log(user); // { uid, photo, email, displayName }

  // カスタムフックでコレクションを取得
  const { documents: channels } = useCollection("channels");

  // 新しいドキュメントを追加
  const onClickAddChannel = async () => {
    // prompt...alertみたいな表示。入力した文字列が返る
    let channelName: string | null = prompt("新しいチャンネルを作成します");
    // console.log(channelName);

    if(channelName){
      await addDoc(collection(db, "channels"), {
        // idは自動でつく
        channelName: channelName,
      })
    }
  }

  // サインアウト
  const onClickSignOut = () => {
    auth.signOut();
  }

  return(
    <div className="sidebar">

      {/* 左サイドバー */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./discordIcon.png" alt="" />
        </div>
        <div className="serverIcon">
          <img src="./logo192.png" alt="" />
        </div>
        <div className="serverIcon">
          <img src="./logo192.png" alt="" />
        </div>
        
      </div>

      {/* 右サイドバー */}
      <div className="sidebarRight">

        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        <div className="sidebarChannelsHeader">
          <div className="sidebarHeader">
            <ExpandMoreIcon />
            <h4>プログラミングチャンネル</h4>
          </div>
          
          <AddIcon className="sidebarAddIcon" onClick={ () => onClickAddChannel() } />
        </div>
        
        <div className="sidebarRightChannels">
          { 
            // [ {id: '8WpITUwBhn7KsLZ0oUDA', channelData: {…}}, {id: '8WpITUwBhn7KsLZ0oUDA', channelData: {…}} ]
            channels.map(channel => (
              // channelsコレクションのドキュメント１つ１つが渡ってくる。
              // ドキュメントの中のコレクションはオブジェクトで渡ってくる
              <SidebarChannel 
                key={ channel.id } 
                channelData={ channel.channelData }
                id={ channel.id } 
              />
            ))
          }
        </div>
          
          <div className="sidebarRight__bottom">
            <div className="sidebarFooter">
              <div className="sidebarAccount">
                <img 
                  src={ user?.photo } 
                  alt=""
                  onClick={ onClickSignOut }
                />

                <div className="accountName">
                  <h4>{ user?.displayName }</h4>
                  <span>#{ user?.uid.substring(0, 4) }</span>
                </div>
              </div>

              <div className="sidebarVoice">
                <MicIcon />
                <HeadphonesIcon />
                <SettingsIcon />
              </div>
            </div>
          </div>



      </div>

    </div>
  )
}

export default Sidebar;


// カスタムフックを使わない場合
// const [ channels, setChannels ] = useState<Channel[]>([]);

  // 全てのドキュメントを取得
  // const q = query(collection(db, "channels")); // channelsのcollectionにアクセス

  // useEffect(() => {
  //   // リアルタイムでデータ取得
  //   onSnapshot(q, (querySnapshot) => {
  //     // console.log(querySnapshot)

  //     const channelsResults: Channel[] = [];

  //     querySnapshot.docs.forEach((doc) => {
  //       // console.log(doc); // doc.idとすると_key()が呼ばれて、idが取得できるようにクラスで記述されている
  //       // console.log(doc.id);
  //       // console.log(doc.data())

  //       channelsResults.push({
  //         id: doc.id, // ドキュメントのid
  //         channelData: doc.data(), // idに紐づいたデータのオブジェクト
  //       })
  //     });

  //     setChannels(channelsResults); // データの状態を保つ
  //   });

  //   // console.log(channels) // {id: '8WpITUwBhn7KsLZ0oUDA', channel: {…}}, {id: '8WpITUwBhn7KsLZ0oUDA', channel: {…}}
  // }, []);