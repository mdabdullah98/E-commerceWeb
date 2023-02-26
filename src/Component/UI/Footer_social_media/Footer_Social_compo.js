import React from 'react'
import classes from './Footer_Social.module.css';
import {FaFacebook,FaYoutube} from 'react-icons/fa'
import {SlSocialSpotify} from 'react-icons/sl'

const FooterSocialCompo = (props) => {
  return (
    <div className={classes.social_media}>
        <span><FaYoutube/></span>
        <span className={classes.spotify}><SlSocialSpotify/></span>
        <span  className={classes.facebook}><FaFacebook/></span>
    </div>
  )
}

export default FooterSocialCompo
