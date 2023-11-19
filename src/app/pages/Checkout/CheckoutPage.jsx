import React, { useEffect, useState } from 'react';
import { postApiCartCheckout, postApiCartDetail } from '../../Api/HttpApi';
import CartService from '../../services/CartService';
import UserService from '../../services/UserService';
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const cartDetail = CartService.getCartDetail();
 
  useEffect(() => {
     
    const fetchData = async () => {
        try {
            const _resp = await postApiCartDetail({ eoCartPK: cartDetail.eoCartPK });
          
            setCartItems(_resp.data.eoCartItemArray);
            setTotalAmount(_resp.data.totalAmount)
            setDataLoaded(true);
            console.log(_resp.data.eoCartItemArray)
        } catch (error) {
            console.log(error)
        }
    }
    fetchData();
}, [cartDetail.eoCartPK]);

const  checkoutAction = ()=>{
 const userDetail = UserService.getUserLogin();
  postApiCartCheckout({ eoCartPK: cartDetail.eoCartPK ,eoUserPK:userDetail.id})
  .then(resp=>{ 
      CartService.removeCart();
      toast("Order Placed Successfully.")
     
      setTimeout(()=>{
        window.location.href='/';
      },2000)
      
  })
}
 

  return (
    <>
    <div className="container mt-5">
    {dataLoaded ? (
      <div className="row">
       
        <div className="col-md-8">
          <h2>Product Details</h2>
          <div className="card">
            <div className="card-body">
             {cartItems.map(item => (
                <div key={item.id}>
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text text-truncate">{item.description}</p>
                <p className="card-text">Price: {item.quantity} X  {item.price} =  {item.quantity * item.price} INR</p>
              </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="col-md-4">
          <h2>Order Summary</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <p className="card-text">Subtotal: ${totalAmount}</p>
              <p className="card-text">Tax: $0.00</p>
              <p className="card-text">Total: ${totalAmount}</p>
              <button type="button" className="btn btn-primary btn-block" onClick={checkoutAction}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
):(
  <div>Loadding..</div>
)}

    </div>

    </>
  );
};

export default CheckoutPage;
