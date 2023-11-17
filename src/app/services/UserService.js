import LocalStorageService from "./LocalStorageService";

const USER_KEY="FSD_USER";
const SELLER_KEY="FSD_SELLER";
const UserService = {

    setUserLogin:(user)=>{
        return LocalStorageService.setItem(USER_KEY,user);
    },
    getUserLogin:()=>{
        return LocalStorageService.getItem(USER_KEY);
    },
    deleteUserLogin: ()=>{
        return LocalStorageService.removeItem(USER_KEY);
    },
    setSellerLogin:(user)=>{
        return LocalStorageService.setItem(SELLER_KEY,user);
    },
    getSellerLogin:()=>{
        return LocalStorageService.getItem(SELLER_KEY);
    },
    deleteSellerLogin: ()=>{
        return LocalStorageService.removeItem(SELLER_KEY);
    },
};
 


export default UserService;