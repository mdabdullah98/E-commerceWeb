import React from 'react'
import MianContent from '../../UI/Main/MianContent'
import {BsFillPlayFill} from 'react-icons/bs'
import classes from './LatestAlbum.module.css' 
const LatesAlbum = (props) => {
  return (
    <div className={classes.album}>
        <MianContent/>
        <button className={classes.latest_album}>Get our Latest Album</button><br />
        <button className={classes.play_button}><BsFillPlayFill/></button>
    </div>
  )
}

export default LatesAlbum