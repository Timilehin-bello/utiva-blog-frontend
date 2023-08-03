import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const isAuthenticated = userInfo;
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}
