import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import { useParams } from 'react-router-dom';
import { fetchProductBySeller } from '../../../Api/HttpApi';
import ReactPaginate from 'react-paginate';
import './Dashboard.css';
import { Edit } from '@mui/icons-material';


const SideBardComponent = () => { 
  return (<>

    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
            Reports
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
            Sells
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
            Customers
          </a>
        </li>
      </ul>
      <hr />
      {/* <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div> */}
    </div>
  </>)
}

const Dashboard = () => {

  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const perPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _data = await fetchProductBySeller(id);
        setProducts(_data);
        setDataLoaded(true);
        console.log(_data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);

  const handleOpen = (_product) => {
    setCurrentProduct(_product);
    setOpen(true);
  }; 


  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);

  const pageCount = Math.ceil(products.length / perPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  return (
    <>
     {dataLoaded ? (<>
      <main className="d-flex flex-nowrap" style={{ height: '100vh' }}>
        <SideBardComponent></SideBardComponent>

        <div className="d-flex flex-column flex-shrink-0 p-5 bg-white" style={{width:'80vw'}}>
          <table className="table table-bordered table-striped">
            <thead>
              <tr className='table-primary'>
               <th scope="col" colSpan={2}>SKU</th>
               <th scope="col">Name</th>
                <th scope="col">Description</th> 
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                 {currentPageData.map(e => (
             
                  <tr key={e.id}>
                  <td><img src={e.imgUrl} style={{'height':'50px','width':'50px'}} alt=''></img></td>
                  <td>{e.sku}</td>
                  <td><div className='td-width'>{e.name}</div></td>
                  <td><div className='td-width'>{e.description}</div></td>
                  
                  <td><Edit onClick={()=>{handleOpen(e)}}></Edit></td>
                </tr> 
              ))}
          
            </tbody>
          </table>

          <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
        </div>
      </main>
      
      <UpdateProduct open={open} setOpen={setOpen} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}></UpdateProduct>
     </>):(<>
      Loading...
     </>)}


      
    </>
  );
}

export default Dashboard;
