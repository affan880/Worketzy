import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./reducers/userDetails";
import recruiterDetails from "./reducers/recruiterDetails";
import companyDetails from "./reducers/companyDetails";
import currentUser from "./reducers/currentUser";
import jobInfo from "./reducers/jobInfo"
import streamTokens from "./reducers/streamTokens";
export default configureStore({
  reducer: {
    userDetails: userDetails,
    recruiterDetails: recruiterDetails,
    companyDetails: companyDetails,
    currentUser: currentUser,
    jobInfo: jobInfo,
    streamTokens: streamTokens,
  },
});