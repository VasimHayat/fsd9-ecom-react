import LocalStorageService from "./LocalStorageService";

const USER_KEY="FSD_USER";
const SELLER_KEY="FSD_SELLER";
const UserService = {

    setUserLogin:(user)=>{
        LocalStorageService.setItem(USER_KEY,user);
    },
    getUserLogin:()=>{
        LocalStorageService.getItem(USER_KEY);
    },
    setSellerLogin:(user)=>{
        LocalStorageService.setItem(SELLER_KEY,user);
    },
    getSellerLogin:()=>{
        LocalStorageService.getItem(SELLER_KEY);
    }
};
 


export default UserService;