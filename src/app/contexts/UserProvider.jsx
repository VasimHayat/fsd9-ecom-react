 
import { createContext, useEffect, useState } from "react"; 
import UserService from "../services/UserService";

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const userSignOut = () => {
    setUser(null)
    setIsLoggedIn(null)
    return UserService.deleteUserLogin()
  }
  
  useEffect(() => { 
    const userDetail = UserService.getUserLogin();
    if (userDetail !== user) {
      setUser(userDetail)
      setIsLoggedIn(true);
      console.log(userDetail)
    };
  }, []);

  return (
    <userContext.Provider value={{ setUser, user, isLoggedIn, setIsLoggedIn, userSignOut }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
