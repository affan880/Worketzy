import { createSlice } from "@reduxjs/toolkit";

export const createJobInfoSlice = createSlice({
  name: "jobInfo",
  initialState: {
    createJobInfo: {
      UniqueId: "",
      ImageForBanner:"https://firebasestorage.googleapis.com/v0/b/worketzy-eecf2.appspot.com/o/images%2FEngineer2.jpg?alt=media&token=34936b04-639d-4530-815c-eb2508e98b44",
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
    },
    setCreateJobInfo: (state, action) => {
      state.createJobInfo = action.payload
    }
  },
});

export const { setBanner, setUidForJobInfo,setJobInfoTitle, setJobType, setCreateJobInfo} = createJobInfoSlice.actions;
export default createJobInfoSlice.reducer;
