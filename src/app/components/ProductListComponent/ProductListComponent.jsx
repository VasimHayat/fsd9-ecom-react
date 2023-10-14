import React, { useEffect, useState } from 'react';
import { fetchAllProduct } from '../../Api/HttpApi';
import './ProductListComponent.css';
import ProductComponent from './ProductComponent/ProductComponent';

const ProductListComponent = () => {

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const _data = await fetchAllProduct();
                setProductList(_data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);



    return (
        <>
            <div className="home-products">

                {productList ? (
                    <>
                      <div className="row row-cols-1 row-cols-md-6 g-6">
                        {productList.slice(0, 12).map(product => (
                            <>
                              <ProductComponent  product={product}   key={product._id}>

                              </ProductComponent>

                                    {/* <div className="col p-2"  key={product.id}>
                                        <div className="card h-100">
                                           <div className='product-img-box'> <img src={product.imgUrl} style={{height:'200px',maxWidth:'200px'}} className="card-img-top" alt="..." /></div>
                                            <div className="card-body">
                                                <h5 className="card-title text-truncate">{product.name}</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                
                                                <div className="fw-bold">Min. {(100/(Math.random(10)*10)).toFixed(2)}% Off</div>
                                            </div>
                                            <div className="card-footer">
                                                <small className="fw-bold">Price : ₹ {product.price} </small>
                                            </div>
                                        </div>
                                    </div>  */}
                            </>
                        ))}
                        </div>
                    </>
                ) : (
                    <>Loading...</>
                )}


                {/* <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 p-3">
                        <h2 className="display-5">Another headline</h2>
                        <p className="lead">And an even wittier subheading.</p>
                    </div>
                    <div className="bg-dark shadow-sm mx-auto" style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}></div>
                </div> */}
            </div>
        </>
    );
}

export default ProductListComponent;