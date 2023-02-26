import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import classes from "./Pages.module.css";
import Header from "../UI/Header/Header";
import { useNavigate } from "react-router-dom";
import { UseProdutsCtx } from "../UI/CartContext/ContextApiComponent";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setisLogin] = useState(true);
  const [error, seterror] = useState(null);
  const [feedback, setFeedBack] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const authCrtx = UseProdutsCtx();
  const navigate = useNavigate();

  const authChangeMode = () => {
    setisLogin((prev) => !prev);
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();

    seterror(null);
    setisLoading(true);
    //listening input value using useRef();
    const getEmailtInputValue = emailInputRef.current.value;
    const getPasswordInputValue = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5TnrQV1eOp5_0M2LS-CCko9aQRJM3ORI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5TnrQV1eOp5_0M2LS-CCko9aQRJM3ORI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: getEmailtInputValue,
        password: getPasswordInputValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setisLoading(false);
        if (res.ok) {
          if (isLogin) {
            setFeedBack("logged in succesfully");
          } else {
            setFeedBack("account is created succesfully");
          }
          return res.json();
        } else {
          return res.json().then((data) => {
            const collectError = data.error.message;
            throw new Error(collectError);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCrtx.authorization.login(
          data.idToken,
          expirationTime.toISOString(),
          data
        );
        //changing bunch of thins if user succesfully login
        setFeedBack("");
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  return (
    <>
      <Header />
      <div className={classes["main-div-pages"]}>
        <div className={classes.innderDiv}>
          <form
            action=""
            className={classes["login-form"]}
            onSubmit={onsubmitHandler}
          >
            <h1 className="display-4 text-light fw-bold">
              {isLogin ? "Login" : "Sign up"}
            </h1>
            <div>
              <label htmlFor="email">Your Email </label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                ref={emailInputRef}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                ref={passwordInputRef}
                required
              />
            </div>
            <div className="mt-4">
              <Button type="submit" className="btn-danger  px-5">
                {isLogin ? "Login" : "Sign up"}
              </Button>
              <p className="text-warning text-center mt-2" id="form-warning">
                {error}
              </p>
              {isLoading && <p className="text-light">Sending request ...</p>}

              <p className="text-white">{feedback}</p>
            </div>
            <div className="d-flex mt-3">
              <span className="text-light mx-2">
                {isLogin ? "dont have an account ?" : ""}
              </span>
              <Button className="btn-sm" onClick={authChangeMode}>
                {isLogin ? "create new account" : "sign with existing account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
