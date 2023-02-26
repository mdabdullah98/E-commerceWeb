import React,{useState} from "react";
import classes from "./SingleProduct.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../UI/Header/Header";
import { UseProdutsCtx } from "../UI/CartContext/ContextApiComponent";

const SingleProductDetails = () => {
  const [showItems, setshowItems] = useState('')
  const itemcrtx = UseProdutsCtx();
  const params = useParams();
  const navigate = useNavigate();


  // this is for the navigation when user click on the image on store page so its redirect to the single produt page and there is a button which says go back to store se when user click on that user will redirct again on store page
  const goBackToStore = () => {
    navigate(-1);
  };

  //get products and  more image products from context api after filter
  const getProductsUsingFilte = itemcrtx.productsArr
    .filter((items) => {
      return items.id === Number(params.id);
    })

  const changeImages =(image)=>{
    setshowItems(image)
  }

  return (
    <>
      <Header />
      <div className={classes.maindiv}>
        <div className={classes.products}>
          <button className={classes["go-back-button"]} onClick={goBackToStore}>
            go back to store
          </button>
          <div className={classes["products-sec"]}>
            <div className={classes["product-img-sec"]}>
              <div className={classes["product-box"]}>
                {itemcrtx.singleProductsitrms.map((item) => {
                  return (
                    <>
                      <div className={classes["img-box"]}>
                        <img
                          src={item.images}
                          alt=""
                          onClick={()=>changeImages(item.images)}
                        />
                      </div>
                    </>
                  );
                })}
               
              </div>
              <div className={classes["main-bigger-img"]}>
                <img
                  src={(!showItems? getProductsUsingFilte[0].imageUrl : showItems)}
                  alt=""
                />
              </div>
            </div>
            <div className={classes["product-info-sec"]}>
              <h1>product information</h1>
              <h6>product id : <span>{getProductsUsingFilte[0].id}</span></h6>
              <h6>product name : <span>{getProductsUsingFilte[0].title}</span></h6>
              <h6>product price : <span>${getProductsUsingFilte[0].price}</span></h6>
              <h6>product url link : <span>{getProductsUsingFilte[0].imageUrl}</span></h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Expedita dolorem ea consequuntur ducimus esse, accusantium fugit
                quo, itaque minus quam eos similique amet porro cum quibusdam
                facere officia incidunt molestias.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Expedita dolorem ea consequuntur ducimus esse, accusantium fugit
                quo, itaque minus quam eos similique amet porro cum quibusdam
                facere officia incidunt molestias.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                aliquid earum accusantium similique quasi suscipit? Facere, quod
                cupiditate. Vero repellendus hic commodi, earum sit doloribus
                accusamus. Nulla aliquid quas repellat in consequuntur saepe
                eligendi, autem neque aut voluptatum! Corrupti omnis, dolore
                harum maxime fugit magni illum delectus vero rerum sunt dolores
                cumque quae mollitia, eius nam obcaecati eos, enim quos possimus
                sapiente fugiat a eligendi neque? Accusantium labore architecto
                mollitia ratione dolore doloribus! Quod saepe, doloribus
                delectus accusantium enim provident commodi eius quisquam,
                libero distinctio dolores pariatur ex placeat adipisci qui,
                suscipit similique eligendi ut tenetur. Ad alias consequatur
                autem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
