import React, { useState } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { UseProdutsCtx } from "../UI/CartContext/ContextApiComponent";

// import { Prev } from "react-bootstrap/esm/PageItem";

const Products = (props) => {
  const itemscrtx = UseProdutsCtx();
  const [Addmessage, setAddmessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
  const loggedUserEmail = itemscrtx.authorization.data;

  // we will push the item inside the usecontext when user click one the add to cart button
  const pickItemId = (id, title, price, imageUrl) => {
    const cartObj = {
      id,
      title,
      price,
      imageUrl,
      email: loggedUserEmail ? loggedUserEmail.email : null,
    };

    // calling fortcartitems function from context Api folder and involing here and passing object
    itemscrtx.forCartItems(cartObj, id);
    setAddmessage(title);
    setDisplayMessage(true);
  };

  // empty the message after few seconds
  setTimeout(() => {
    setAddmessage("");
    setDisplayMessage(false);
  }, 3200);

  return (
    <>
      <div className={classes["product-sec"]}>
        <h1>Albums</h1>
        <div className={classes.myGrid}>
          {itemscrtx.productsArr.map((item) => {
            const { id, title, price, imageUrl } = item;

            return (
              <>
                <div className={classes.card} key={id}>
                  <div className={classes.title}>
                    <h3>{title}</h3>
                  </div>
                  <div className={classes["image-sec"]}>
                    <Link to={`/products/${id}`}>
                      {" "}
                      <img src={`${imageUrl}`} alt="" />
                    </Link>
                    {/* this is for hover evffect which over the image */}
                    {/* <span></span> */}
                  </div>
                  <div className={classes["cost-addToCartButton"]}>
                    <h6 className="cost">${price}</h6>
                    <button
                      className="addToCartButton"
                      onClick={() => pickItemId(id, title, price, imageUrl)}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className={classes.see_the_cart}>
          <button>
            <a href="#mycart">See the cart</a>
            <span></span>
            {/* making span for hover purpose when user hover on the button an animation would come in action */}
          </button>
        </div>
        {displayMessage && (
          <div className={classes.message}>
            <p>
              Your product : <span> {Addmessage}</span> is added
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
