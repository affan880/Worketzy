import { createSlice } from "@reduxjs/toolkit";

export const recruiterDetailsSlice = createSlice({
  name: "recruiterDetails",
  initialState: {
    recruiterDetails: {
      UniqueId: "",
      Image:
        "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Designation: "",
      Email: "",
      Verified: false,
    },
    recruiterStatus: {
      status: "",
      id: "",
    },
  },
  reducers: {
    setRecruiterStatus: (state, action) => {
      state.recruiterStatus = action.payload;
    },
    setRecruiterDetails: (state, action) => { 
      state.recruiterDetails = action.payload;
    }
  },
});

export const {
  setRecruiterStatus,
  setRecruiterDetails
} = recruiterDetailsSlice.actions;
export default recruiterDetailsSlice.reducer;
