 
import { useContext } from 'react';
import styles from './Navbar.module.css'; 
import { userContext } from '../../contexts/UserProvider';

const Navbar = () => {
  const { user ,isLoggedIn} = useContext(userContext); 

  console.log(user)

  return (
    
    <nav className="navbar navbar-expand-lg ">


      <div className="container-xxl bd-gutter flex-wrap flex-lg-nowrap pt-2">
        <div className="d-flex me-auto">
          <a className="navbar-brand p-0 me-0 me-lg-2" href="/" aria-label="FSD9">
            <img
              src="https://cdnhubworks.s3.us-west-1.amazonaws.com/hwtest/201805301649/temp/logo3.PNG"
              
              height="43"
              alt="FSD09"
            />
          </a>
          <form className="d-flex me-auto" role="search">
            <input className="form-control" style={{ width: '40vw', marginLeft: '10px' }} type="search" placeholder="Search" aria-label="Search" />



          </form>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <a className={`${styles.a_nav_link} nav-link`} aria-current="page" href="/seller/auth">
                <img className={styles.padding_5} src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg'  alt=''/>
                Become a Seller</a>
            </li>

            {
             isLoggedIn?(<>

                    <li className="nav-item dropdown">

                    <a className={`${styles.a_nav_link} nav-link dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img className={styles.padding_5} src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg' alt='' />
                       {user.firstName}
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">My Profile</a></li>
                      <li><a  className="dropdown-item" href="#">Orders</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Wishlist</a></li>
                    </ul>
                    </li>
                </>):(
                 <>
                    <li className="nav-item">
                      <a className={`${styles.a_nav_link} nav-link`} aria-current="page" href="/login">
                      <img className={styles.padding_5} src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg' alt='' />
                      Sign In </a>
                    </li>
                </>
            )
}
          
            <li className="nav-item">
              <a className={`${styles.a_nav_link} nav-link`}>
                <img className={styles.padding_5} src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg' alt='' />
                Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
