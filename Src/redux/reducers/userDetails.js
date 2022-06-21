import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    details: {
      userUniqueId: "",
      userImage:
        "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userBio: "",
      userPhone: "",
      userIsstudent: false,
      userUniversityName: "",
      userRecentEmployer: "",
      userEmployeeStatus: null,
      userEmploymentType: "",
      userPreferedCity: "",
      userJobType: "",
      userJobCategory: "",
      userNextJobExpectations: ""
    },
    user: {
      status: "",
      id: "",
    },
  },
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setuserDetails: (state, action) => {
      state.details.userUniqueId = action.payload.userUniqueId;
      state.details.userImage = action.payload.userImage;
      state.details.userFirstName = action.payload.userFirstName;
      state.details.userLastName = action.payload.userLastName;
      state.details.userEmail = action.payload.userEmail;
      state.details.userBio = action.payload.userBio;
      state.details.userPhone = action.payload.userPhone;
      state.details.userUniversityName = action.payload.userUniversityName;
      state.details.userRecentEmployer = action.payload.userRecentEmployer;
      state.details.userPreferedCity = action.payload.userPreferedCity;
      state.details.userJobType = action.payload.userJobType;
      state.details.userNextJobExpectations =
        action.payload.userNextJobExpectations;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserImage: (state, action) => {
      state.details.userImage = action.payload;
    },
    setUserEmployeeStatus: (state, action) => {
      state.details.userEmployeeStatus = action.payload;
    },
    setuserIsstudent: (state, action) => {
      state.details.userIsstudent = action.payload;
    },
    setuserEmploymentType: (state, action) => {
      state.details.userEmploymentType = action.payload;
    },
    setuserJobType: (state, action) => {
      state.details.userJobType = action.payload;
    },
  },
});

export const {
  setuserDetails,
  setUserLastName,
  setUser,
  setUserImage,
  setUserEmployeeStatus,
  setuserIsstudent,
  setuserEmploymentType,
  setuserJobType,
  setDetails
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;