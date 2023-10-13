/**************************************************************



***************************************************************/
import { createSlice } from "@reduxjs/toolkit";

import { InitialChannelState } from "../Types";

const initialState: InitialChannelState = {
  channelId: null,
  channelName: null,
}


export const channelSlice = createSlice({
  name: "channel",
  initialState: initialState,

  reducers: {
    // 今のチャンネルから、クリックしたチャンネルに更新できる
    setChannelInfo: (state, action) => {
      // console.log(action); // {type: 'channel/setChannelInfo', payload: {…}}

      // id の更新
      state.channelId = action.payload.channelId;

      // channelName の更新
      state.channelName = action.payload.channelName;
    },
  },

});

// action 
export const { setChannelInfo } = channelSlice.actions;

// reducers
export default channelSlice.reducer;