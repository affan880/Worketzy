import { createSlice } from "@reduxjs/toolkit";

export const setStreamSlice = createSlice({
  name: "streamTokens",
    initialState: {
        connectUser: { 
            userID: null,
            userImage:
            "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
            userName: null,
        }
  },
  reducers: {
      setStreamToken: (state, action) => { 
          state.connectUser = action.payload;
      }
  },
});

export const { setStreamToken } = setStreamSlice.actions;
export default setStreamSlice.reducer;
