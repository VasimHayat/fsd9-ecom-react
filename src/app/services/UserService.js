import LocalStorageService from "./LocalStorageService";

const USER_KEY="FSD_USER";
const UserService = {

    setUserLogin:(user)=>{
        LocalStorageService.setItem(USER_KEY,user);
    },
    getUserLogin:()=>{
        LocalStorageService.getItem(USER_KEY);
    }
};
 


export default UserService;