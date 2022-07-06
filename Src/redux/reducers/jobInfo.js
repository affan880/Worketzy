import { createSlice } from "@reduxjs/toolkit";

export const createJobInfoSlice = createSlice({
  name: "jobInfo",
  initialState: {
    createJobInfo: {
      UniqueId: "",
      ImageForBanner:
        "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
      JobType:"",
      JobTitle:"",
      JobDescription:"",
      RequiredSkills:"",
      JobRequirements:"",
      JobLocation:""
    },
  },
  reducers: {
    setBanner: (state, action) => {
      state.createJobInfo.ImageForBanner = action.payload
    },
    setUidForJobInfo: (state, action) => {
      state.createJobInfo.UniqueId = action.payload
    },
    setJobInfoTitle: (state, action) => {
      state.createJobInfo.JobTitle = action.payload
    },
    setJobType: (state, action) => {
      state.createJobInfo.JobType = action.payload
    }
  },
});

export const { setBanner, setUidForJobInfo,setJobInfoTitle, setJobType, } = createJobInfoSlice.actions;
export default createJobInfoSlice.reducer;
