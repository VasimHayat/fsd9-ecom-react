import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import reportWebVitals from "./reportWebVitals";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./app/pages/NotFound/NotFoundPage";
import Home from "./app/pages/Home/Home";
import App from "./App";
import Login, {
  action as loginAction,
} from "./app/pages/Authentication/Login/Login";
import Registration from "./app/pages/Authentication/Registeration/Registration";
import CategoriesLayout from "./app/pages/CategoriesLayout/CategoriesLayout";
import ProductCategory from "./app/pages/CategoriesLayout/Category/ProductCategory";
import ProductsLayout from "./app/pages/ProductsLayout/ProductsLayout";
import ProductDetail from "./app/pages/ProductsLayout/ProductDetail/ProductDetail";
import UserProvider from "./app/contexts/UserProvider";
import SellerLayout from "./app/pages/Seller/SellerLayout";
import Dashboard from "./app/pages/Seller/Dashboard/Dashboard";
import SellerProvider from "./app/contexts/SellerProvider";
import SellerLogin from "./app/pages/Seller/Auth/SellerAuth";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          // { index: true, element: <ProductComponent /> },
          { path: ":id", element: <ProductDetail /> },
        ],
      },
      {
        path: "category",
        element: <CategoriesLayout />,
        children: [
          // { index: true, element: <Categories /> },
          { path: ":id", element: <ProductCategory /> },
        ],
      },
      { path: "register", element: <Registration /> },
      { path: "login", element: <Login /> },
      // { path: "forgot-password", element: <ForgotPassword /> },
       {
        path: "seller", element: <SellerLayout />, children: [ 
          { path: "auth", element: <SellerLogin /> },
          { path: "user", element: <SellerLayout /> ,
           children:[
            { path: ":id", element: <Dashboard /> },
           ]
        },
        ]
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // createRoutesFromElements(
  //   <Route path='/' element={<Layout />}>
  //     <Route path='' element={<Home />} />
  //     <Route path='about' element={<About />} />
  //     <Route path='contact' element={<Contact />} />
  //     <Route path='user/:userid' element={<User />} />
  //     <Route
  //     loader={githubInfoLoader}
  //     path='github'
  //     element={<Github />}
  //      />
  //   </Route>
  // )
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SellerProvider>
        <RouterProvider router={router} />
      </SellerProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
