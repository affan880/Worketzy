import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./reducers/userDetails";
import recruiterDetails from "./reducers/recruiterDetails";
import companyDetails from "./reducers/companyDetails";
import currentUser from "./reducers/currentUser";
export default configureStore({
  reducer: {
    userDetails: userDetails,
    recruiterDetails: recruiterDetails,
    companyDetails: companyDetails,
    currentUser: currentUser,
  },
});