import { createSlice } from "@reduxjs/toolkit";

export const currentUserDetailsSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null,
    userImage:
      "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
    companyLogo : "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setCompanyLogo: (state, action) => {
      state.companyLogo = action.payload;
    }
  }
});

export const { setUser, setUserImage,setCompanyLogo } = currentUserDetailsSlice.actions;
export default currentUserDetailsSlice.reducer;