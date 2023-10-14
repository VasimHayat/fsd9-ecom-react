 
import { createContext, useEffect, useState } from "react"; 

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
 

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setUser({ token: token });
  }, []);

  return (
    <userContext.Provider value={{ setUser,user,isLoggedIn, setIsLoggedIn }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
