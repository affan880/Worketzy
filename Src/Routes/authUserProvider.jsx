import React, { createContext, useState } from "react";

export const AuthUserContext = createContext({});
export const AuthUserExistContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState({
    status : null,
    id: null,
  });

  return (
    <AuthUserContext.Provider value={{ user, setUser }} >
      {children}
    </AuthUserContext.Provider>
  );
};