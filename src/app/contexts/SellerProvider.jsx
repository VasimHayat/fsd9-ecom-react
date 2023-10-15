 
import { createContext, useEffect, useState } from "react"; 
import UserService from "../services/UserService";

export const sellerContext = createContext();

function SellerProvider({ children }) {
  const [seller, setSeller] = useState(null);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(null); 
 

  useEffect(() => { 
    const sellerDetail = UserService.getSellerLogin();
    if (sellerDetail) {
      setSeller(sellerDetail)
      setIsSellerLoggedIn(true);
    };
  }, []);
  return (
    <sellerContext.Provider value={{ setSeller,seller,isSellerLoggedIn, setIsSellerLoggedIn }}>
      {children}
    </sellerContext.Provider>
  );
}

export default SellerProvider;
