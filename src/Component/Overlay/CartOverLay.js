import React from "react";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { UseProdutsCtx } from "../UI/CartContext/ContextApiComponent";
import classes from "./CartOverlay.module.css";

const CartOverLay = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        props.showOverlayUseState && (
          <CartOverlayContent
            showOverlayOnclick={props.showOverlayOnclickTOverlay}
            // items={props.itemsForOverLay}
          >
            {props.children}
          </CartOverlayContent>
        ),
        document.getElementById("cart-overLay")
      )}
    </>
  );
};

export default CartOverLay;

const CartOverlayContent = (props) => {
  const itemcrtx = UseProdutsCtx();

  // here we are listing the input
  const changePriceByQuanitity = (e, price, id) => {
    if (+e > 1) {
      let updatedprice = itemcrtx.myitems.find((items) => {
        if (items.id === id) {
          items.price = e * price;
        }
      });
    }
  };

  //updating the price
  let totalPrice;
  if (itemcrtx.myitems.length > 0) {
    totalPrice = itemcrtx.myitems
      .map((items) => {
        return items.price;
      })
      .reduce((accu, curr) => {
        return (accu += curr);
      });
  }

  // remove item when user press the remove button right below
  const removeItemsOnclick = (id) => {
    itemcrtx.removeItem(id);
  };

  return (
    <>
      <section className={classes.overlay}>
        <div className={classes["cancel-button"]}>
          <MdCancel onClick={props.showOverlayOnclick} />
        </div>
        <h1>Cart</h1>

        {/* cart header */}
        <div className={classes["cart-header"]}>
          <h4>item</h4>
          <h4>price</h4>
          <h4>quantity</h4>
        </div>

        {/* cart item sec over here like image title cost/price and quantity */}
        {itemcrtx.myitems.length > 0 ? (
          itemcrtx.myitems.map((item) => {
            const { id, price, imageUrl, title } = item;
            return (
              <>
                <div className={classes["cart-item-row"]} key={id}>
                  <div className={classes["cartItems-image-title"]}>
                    <img src={`${imageUrl}`} alt="" />
                    <h6>{title}</h6>
                  </div>

                  <div className={classes["cart-pice"]}>
                    <h6>${price}</h6>
                  </div>

                  <div className={classes["cart-quantity"]}>
                    <input
                      type="text"
                      onInput={(e) =>
                        changePriceByQuanitity(e.target.value, price, id)
                      }
                      min={"1"}
                      max={"5"}
                    />
                    <button onClick={() => removeItemsOnclick(id)}>
                      remove
                    </button>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h1>No items</h1>
        )}
        <div className={classes["cart-total"]}>
          <span>total </span>
          <span>${totalPrice}</span>
        </div>

        <div className={classes["purchase-sec"]}>
          <button>purchase</button>
        </div>
      </section>
    </>
  );
};
