import React, { useState } from "react";
import classes from "./Store.module.css";
import Products from "./Products";
import Header from "../UI/Header/Header.js";
import MianContent from "../UI/Main/MianContent";
import Footer from "../UI/Footer/Footer";
import CartOverLay from "../Overlay/CartOverLay.js";

const Store = (props) => {
  const [ShowOverLAy, setShowOverLAy] = useState(false);
  const showHeaderCartInStoreTabOnly = true;
  const ShowFooterSocialMediaAtStoreTab = true;

  const showOverlayOnclick = () => {
    setShowOverLAy((prev) => !prev);
  };

  return (
    <>
      <Header
        showHeaderCart={showHeaderCartInStoreTabOnly}
        ShowOverLAyFuncToHeader={showOverlayOnclick}
      />
      <CartOverLay
        showOverlayUseState={ShowOverLAy}
        showOverlayOnclickTOverlay={showOverlayOnclick}
      />
      <div className={classes["main-content-compo"]}>
        <MianContent />
      </div>
      <Products />
      <Footer displaySocialMediaAtStoreTab={ShowFooterSocialMediaAtStoreTab} />
    </>
  );
};

export default Store;
