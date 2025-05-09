import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState(null); 

  return (
    <UserContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserPhoto = () => useContext(UserContext);
