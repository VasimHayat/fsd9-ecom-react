import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchProductDetail } from "../../../Api/HttpApi";
import './ProductDetail.css';
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../../../contexts/CartProvider"; 

const ProductDetail = () => {

    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

   

const { addItemToCart, removeItemFromCart, getCartItems } = useCart();

  const handleAddItem = () => {
    const payLoad = {eoProductItemPK: product.id, qnt:1  }; 
    console.log("CALLLLLLLllll")
    addItemToCart(payLoad);
  
  };

//   const handleRemoveItem = () => {
//     const itemToRemove = { id: product.id, name: product.name, price: product.price };
//     removeItemFromCart(itemToRemove);
//   };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const _data = await fetchProductDetail(id);
                setProduct(_data);
                setDataLoaded(true);
                console.log(_data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id]);


    return (
        <>
            {dataLoaded ? (
                <div className="container col-xxl-8   py-5">
                    <div className="row flex-lg-row align-items-center-d g-5 py-5">
                        <div className="col-10 col-sm-12 col-lg-6">
                            <div className="row flex-lg-row ">
                                <div className="col-3 col-lg-3 col-sm-6"> 
                                <div className="card">
                                    <ul className="list-group list-group-flush">
                                    {product.eoProductImgArray.map((_img, index) => (
                                        <li  key={index} className="list-group-item"> 
                                        <img src={_img.imgUrl} className="product-image" alt="ProductImage"></img>
                                        </li> 
                                    ))}
                                       
                                    </ul> 
                                    </div>
                                </div>
                                <div className="col-9 col-lg-9 col-sm-6">
                                <img src={product.imgUrl} className="product_imgUrl d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" />
                                    <div className="d-grid gap-2 d-md-flex py-4 justify-content-md-center">
                                        <button type="button" className="btn  btn-outline-secondary  btn-lg px-4 me-md-2">Add To wishlisth</button>
                                        <button type="button" className="btn btn-primary btn-lg px-4" onClick={handleAddItem}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-6">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    to="/"
                                >
                                    Home
                                </Link>
                                <Link underline="hover" color="inherit" to={`../../category/${product.eoProductCategory.id}`}
                                >
                                    {product.eoProductCategory?.name}
                                </Link>
                                {/* <Typography color="text.primary text-truncate">{product?.name}</Typography> */}
                            </Breadcrumbs>
                            <div className="fw-bold fs-4 lh-2 mb-3">{product.name}</div>
                            <div>

                                <Rating name="read-only" value={product?.rating} readOnly />
                            </div>

                            <h1 className="card-title pricing-card-title">₹ {product.price}</h1>
                            <div className="container d-flex">
                                <div className="col-md-3 fw-bold  d-flex  p-3">
                                    Highlights
                                </div>
                                <div className="col-md-9 p-3" style={{ lineHeight: 2 }} dangerouslySetInnerHTML={{ __html: product.keyFeatures }}>

                                </div>
                            </div>

                            <div className="container d-flex">
                                <div className="col-md-3 d-flex fw-bold  p-3">
                                    Seller
                                </div>
                                <div className="col-md-9 p-3 fw-bold text-primary" style={{ lineHeight: 2, fontStyle: 'italic' }}>
                                    {product.sellerUser?.firstName}
                                </div>
                            </div>
                            <div className="container d-flex">
                                <div className="col-md-3 fw-bold d-flex p-3 ">
                                    Description
                                </div>
                                <div className="col-md-9 p-3" style={{ lineHeight: 2, fontStyle: 'italic' }}>
                                    {product.description}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}



        </>
    )
}

export default ProductDetail;