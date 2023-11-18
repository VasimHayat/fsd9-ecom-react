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
    },

    getCartItemQnt:(itemId)=>{
        const cartDetail =  LocalStorageService.getItem(FSD_CART);
        itemId = parseInt(itemId);
        if(cartDetail == null){
            return 0;
        }
        for(let i =0;i<cartDetail.eoCartItemArray.length;i++){
            if(cartDetail.eoCartItemArray[i].productId === itemId){
                return cartDetail.eoCartItemArray[i].quantity;
            }else if( i+1 === cartDetail.eoCartItemArray){
                return 0;
            }
        }
    }
};
 


export default CartService;