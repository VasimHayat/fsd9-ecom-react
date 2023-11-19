import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { useParams } from "react-router";
import { postApiUserOrders } from '../../Api/HttpApi';

const UserOrders = () => {
  let { id } = useParams();
  const userDetail = UserService.getUserLogin();
  const [orders, setOrders] = useState([]);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {   
    const fetchData = async () => {
        try {
            const _resp = await postApiUserOrders({ eoUserPK:id }); 
            setOrders(_resp.data); 
            setLoadingDone(true);
        } catch (error) {
            console.log(error)
        }
    }
    fetchData();
}, [id]);


  return (
    <div className="container mt-5">
      <h2>User Orders</h2>


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ORD123456</td>
            <td>Product A</td>
            <td>2</td>
            <td>$39.98</td>
            <td><span className="badge badge-success">Shipped</span></td>
          </tr> 
          <tr>
            <th scope="row">2</th>
            <td>ORD789012</td>
            <td>Product B</td>
            <td>1</td>
            <td>$19.99</td>
            <td><span className="badge badge-warning">Pending</span></td>
          </tr>
          {/* Add more rows for additional orders */}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
