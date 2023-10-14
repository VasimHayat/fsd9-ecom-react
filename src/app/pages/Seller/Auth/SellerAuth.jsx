
import {useState } from 'react'; 
import BaseLogin from '../BaseLogin/BaseLogin';
 

function SellerLogin() {
  const [isSeller, setIsSeller] = useState(true);
   
  return (
    <>
    <BaseLogin isSeller={isSeller}></BaseLogin>
     </>
  );
}
 

export default SellerLogin;
