import React from "react";
import classes from "./Footer.module.css";
import FooterSocialCompo from '../Footer_social_media/Footer_Social_compo'

const Footer = (props) => {
  return (
    <div className={classes.footer}>
        <h1>The Music Hub</h1>
        {props.displaySocialMediaAtStoreTab && <FooterSocialCompo/>}
    </div>
  );
};

export default Footer;
