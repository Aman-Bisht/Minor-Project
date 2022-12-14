import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import NewUserProduct from "./component/User/NewUserProduct.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useAlert } from "react-alert";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import ProtectedAdminRoute from "./component/Route/ProtectedAdminRoute";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
  // const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault()); //when we dont want to inspect

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<ProtectedRoute />}>
              <Route exact path="/process/payment" element={<Payment />} />
            </Route>
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/user/product" element={<NewUserProduct />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route
              isAdmin={true}
              path="/admin/dashboard"
              element={<Dashboard />}
            />
            <Route
              isAdmin={true}
              path="/admin/products"
              element={<ProductList />}
            />
            <Route
              isAdmin={true}
              path="/admin/product"
              element={<NewProduct />}
            />
            <Route
              isAdmin={true}
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
            <Route
              isAdmin={true}
              path="/admin/orders"
              element={<OrderList />}
            />
            <Route
              isAdmin={true}
              path="/admin/order/:id"
              element={<ProcessOrder />}
            />
            <Route isAdmin={true} path="/admin/users" element={<UserList />} />
            <Route
              isAdmin={true}
              path="/admin/user/:id"
              element={<UpdateUser />}
            />
            <Route
              isAdmin={true}
              path="/admin/reviews"
              element={<ProductReviews />}
            />
          </Route>
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<NotFound />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;

