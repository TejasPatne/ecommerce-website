import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect,useState} from 'react'
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './component/layout/header/Header';
import Footer from './component/layout/footer/Footer.js';
import Home from './component/home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from './component/User/Profile.js'
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import axios from 'axios';
import Payment from './component/Cart/Payment.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js'
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/Not Found/NotFound';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
      <BrowserRouter>
        <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/product/:id" element={<ProductDetails/>} />
          <Route exact path="/products" element={<Products/>} />
          <Route path="/products/:keyword" element={<Products/>} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/search" element={<Search/>} />
          <Route exact path="/login" element={<LoginSignUp/>} />
          <Route exact path="/account" element={isAuthenticated && <Profile />} />
          <Route exact path="/me/update" element={isAuthenticated && <UpdateProfile />} />
          <Route exact path="/password/update" element={isAuthenticated && <UpdatePassword />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={isAuthenticated && <Shipping />} />
          {stripeApiKey &&
          <Route exact path="/process/payment" element={isAuthenticated && <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />}
          <Route exact path="/success" element={isAuthenticated && <OrderSuccess />} />
          <Route exact path="/orders" element={isAuthenticated && <MyOrders />} />
          <Route exact path="/order/confirm" element={isAuthenticated && <ConfirmOrder />} />
          <Route exact path="/order/:id" element={isAuthenticated && <OrderDetails />} />
          <Route exact path="/admin/dashboard" element={isAuthenticated && (user.role ==='admin'? true: false) && <Dashboard />} />
          <Route exact path="/admin/products" element={isAuthenticated && (user.role ==='admin'? true: false) && <ProductList />} />
          <Route exact path="/admin/product" element={isAuthenticated && (user.role ==='admin'? true: false) && <NewProduct />} />
          <Route exact path="/admin/product/:id" element={isAuthenticated && (user.role ==='admin'? true: false) && <UpdateProduct />} />
          <Route exact path="/admin/orders" element={isAuthenticated && (user.role ==='admin'? true: false) && <OrderList />} />
          <Route exact path="/admin/order/:id" element={isAuthenticated && (user.role ==='admin'? true: false) && <ProcessOrder />} />
          <Route exact path="/admin/users" element={isAuthenticated && (user.role ==='admin'? true: false) && <UsersList />} />
          <Route exact path="/admin/user/:id" element={isAuthenticated && (user.role ==='admin'? true: false) && <UpdateUser />} />
          <Route exact path="/admin/reviews" element={isAuthenticated && (user.role ==='admin'? true: false) && <ProductReviews />} />
          <Route path="*" element={window.location.pathname === "/process/payment" ? null :<NotFound/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
