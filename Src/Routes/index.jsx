import React from "react";
import { AuthUserProvider } from "./authUserProvider";
import JobTypeSelectorRoute from './Routes'
export default function Providers() {
  return (
    <AuthUserProvider>
      <JobTypeSelectorRoute />
    </AuthUserProvider>
  );
}
