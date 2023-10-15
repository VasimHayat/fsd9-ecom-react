
import {useState } from 'react';  
import BaseLogin from '../../Authentication/BaseLogin/BaseLogin';
 

const  SellerLogin = ()=> {
  const [isSeller, setIsSeller] = useState(true);
   
  return (
    <>
    <BaseLogin isSeller={isSeller}></BaseLogin>
     </>
  );
}
 

export default SellerLogin;
