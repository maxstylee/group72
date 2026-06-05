import { createContext, useState } from "react";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "გიორგი",
    role: "Admin",
    isLoggedIn: true,
  });
  const toggleLogin = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isLoggedIn: !prevUser.isLoggedIn,
    }));
  };
  return (
    <UserContext.Provider value={{ user, toggleLogin }}>
      {children}
    </UserContext.Provider>
  );
}
