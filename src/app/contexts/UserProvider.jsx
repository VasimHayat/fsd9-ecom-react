 
import { createContext, useEffect, useState } from "react"; 
import UserService from "../services/UserService";

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
 

  useEffect(() => { 
    const userDetail = UserService.getUserLogin();
    if (userDetail) {
      setUser(userDetail)
      setIsLoggedIn(true);
    };
  }, []);

  return (
    <userContext.Provider value={{ setUser,user,isLoggedIn, setIsLoggedIn }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
