import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Component/Home/Home";
import About from "../src/Component/About/About";
import Store from "../src/Component/Store/Store.js";
import ContactUs from "./Component/ContactUs/ContactUs";
import SingleProductDetails from "./Component/SingleProdutcPage/SingleProductDetails";
import Login from "./Component/Pages/Login";
import Profile from "./Component/Pages/Profile";
import { UseProdutsCtx } from "./Component/UI/CartContext/ContextApiComponent";
import "./App.css";

function App() {
  const authCrtx = UseProdutsCtx();
  const isLoggedIn = authCrtx.authorization.isLoggedIn;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/products/:id" element={<SingleProductDetails />} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
