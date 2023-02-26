import React from 'react'
import classes from './HeaderCart.module.css'
import { UseProdutsCtx } from '../UI/CartContext/ContextApiComponent'

const HeaderCart = (props) => {
   const itemCrtx= UseProdutsCtx();
   const totalItems= itemCrtx.myitems.length;
  return (
   <>
   <div className={classes.cart}>
      <a href="#headercart" onClick={props.ShowOverLAyFuncToHeaderCart}>Cart </a> 
   </div>
       <span className={classes.cartNumber}>{totalItems}</span>
     
   </>
    
  )
}

export default HeaderCart