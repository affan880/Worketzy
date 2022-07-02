import { createSlice } from "@reduxjs/toolkit";

export const companyDetailsSlice = createSlice({
  name: "companyDetails",
  initialState: {
    companyDetails: {
      UniqueId: "",
      Image:
        "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
      CompaniesLegalName: "",
      CompanyShortName: "",
      Industry: "",
      CompanyLocatioon: "",
      CompanyWebsite: "",
      Verified: false,
    },
    Documents: ""
  },
  reducers: {
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
    },
    setDocuments: (state, action) => { 
      state.Documents = action.payload;
    }
  },
});

export const { setCompanyDetails, setDocuments } = companyDetailsSlice.actions;
export default companyDetailsSlice.reducer;
