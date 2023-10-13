/**************************************************************



***************************************************************/
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

import "./ChatHeader.scss";

type ChatHeaderProps = {
  channelName: string | null,
}


const ChatHeader: React.FC<ChatHeaderProps> = ({ channelName }) => {

  return(
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        <h3>
          <span className="chatHeaderHash">#</span>
          { channelName }
        </h3>
      </div>

      <div className="chatHeaderRight">
        <NotificationsIcon />
        <PushPinIcon />
        <PeopleIcon />

        <div className="chatHeaderSearch">
          <input type="text" placeholder="検索" />
          <SearchIcon />
        </div>

        <SendIcon />
        <HelpIcon />
      </div>

    </div>
  )
}

export default ChatHeader;