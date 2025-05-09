import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedData = sessionStorage.getItem("userRole");
    if (storedData === "admin") {
      return true;
    } else {
      return false;
    }
  });

  return (
    <UserContext.Provider
      value={{ userPhoto, setUserPhoto, isAdmin, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserPhoto = () => useContext(UserContext);
export const useIsAdmin = () => useContext(UserContext);
