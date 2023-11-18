import { toast } from "react-toastify";
import { postApiAddCartItem, postApiUpdateCartItem } from "../Api/HttpApi";
import LocalStorageService from "./LocalStorageService"; 


const FSD_CART="FSD_CART"; 
let eoUserCart = null;
const CartService = { 

    addCartItem:(payLoad,setCartDetail)=>{    
        eoUserCart = LocalStorageService.getItem(FSD_CART);
        if(eoUserCart == null){       
            postApiAddCartItem(payLoad)
            .then(respone =>{
                LocalStorageService.setItem(FSD_CART,respone.data); 
                setCartDetail(respone);
                toast("Item Added")
            })
            .catch(err=>{

            })
        }else{
            payLoad['eoCartPK'] =eoUserCart.eoCartPK;
            postApiUpdateCartItem(payLoad)
            .then(respone =>{
                LocalStorageService.setItem(FSD_CART,respone.data);
                setCartDetail(respone);
                toast("Item Update")
            })
            .catch(err=>{

            })
        }        
        
    },
    removeCart:()=>{
        LocalStorageService.removeItem(FSD_CART);
    },
    updateCart:(cart)=>{
        LocalStorageService.setItem(FSD_CART,cart);
    },
    
    
    getCartDetail:()=>{
       return LocalStorageService.getItem(FSD_CART);        
    }
};
 


export default CartService;