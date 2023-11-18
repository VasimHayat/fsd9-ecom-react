import LocalStorageService from "./LocalStorageService";

const USER_KEY="FSD_USER";
const SELLER_KEY="FSD_SELLER";
const UserService = {

    setUserLogin:(user)=>{
        LocalStorageService.setItem(USER_KEY,user);
    },
    getUserLogin:()=>{
        return LocalStorageService.getItem(USER_KEY);
    },
    setSellerLogin:(user)=>{
        LocalStorageService.setItem(SELLER_KEY,user);
    },
    getSellerLogin:()=>{
        return LocalStorageService.getItem(SELLER_KEY);
    }
};
 


export default UserService;