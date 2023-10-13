/**************************************************************



***************************************************************/
import { DocumentData } from "firebase/firestore";

import "./SidebarChannel.scss"
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

type SidebarChannelProps = {
  id: string,
  channelData: DocumentData, // ドキュメントの型
}

// const SidebarChannel = ({ id, channelData }: SidebarChannelProps) => {
const SidebarChannel: React.FC<SidebarChannelProps> = (props) => {
  // console.log(props); // { channelData: {channelName: "ドキュメント名"}, id: 'id0000000'}
  const { id, channelData } = props;
  

  const dispatch = useAppDispatch(); // useDispatchの型付き

  const onClickSetChannelInfo = () => {
    // console.log(id, channelData.channelName);

    // Reducerに追加
    dispatch(setChannelInfo({ 
      channelId: id, 
      channelName: channelData.channelName,
    }))
  }


  return (
    <div 
      className="sidebarChannel" 
      onClick={ () => onClickSetChannelInfo() }
    >
      <h4>
        <span className="sidebarChannelHash">#</span>
        { channelData.channelName }
      </h4>
    </div>
  )
}

export default SidebarChannel;