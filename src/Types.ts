/**************************************************************

型

***************************************************************/

// ユーザーの型
export type InitialUserState = {
  user: null | { // null ではない場合
    uid: string,
    photo: string,
    email: string,
    displayName: string,
  }
}


// チャンネルの型
export type InitialChannelState = {
  channelId: string | null,
  channelName: string | null,
}