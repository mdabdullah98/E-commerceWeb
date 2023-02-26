import React, { useRef, useState } from "react";
import Header from "../UI/Header/Header";
import classes from "./Pages.module.css";
import { useNavigate } from "react-router-dom";
import { UseProdutsCtx } from "../UI/CartContext/ContextApiComponent";

const Profile = () => {
  const newpasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [passwordChangedFeedBack, setPasswordChangedFeedBack] = useState(false);
  const [islodaing, setislodaing] = useState(false);
  const [error, setError] = useState(null);
  const authCrtx = UseProdutsCtx();

  const navigate = useNavigate();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    setError(null);
    const getNewPasswordValue = newpasswordRef.current.value;
    const getConfirmPasswordValue = confirmPasswordRef.current.value;

    if (getNewPasswordValue === getConfirmPasswordValue) {
      setislodaing(true);
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5TnrQV1eOp5_0M2LS-CCko9aQRJM3ORI";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCrtx.authorization.token,
          password: getNewPasswordValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setislodaing(false);
          if (res.ok) {
            setPasswordChangedFeedBack(true);
            setTimeout(() => {
              setPasswordChangedFeedBack(false);
            }, 2500);
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          authCrtx.authorization.logout();
          navigate("/login");
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setpasswordMatch(true);
      setTimeout(() => {
        setpasswordMatch(false);
      }, 2500);
    }
  };
  return (
    <>
      <Header />
      <div className={classes["main-div-pages"]}>
        <h1 className="display-4 text-center fw-bold">Your User Profile</h1>
        <form
          action=""
          className="w-100 text-center mt-5"
          onSubmit={onsubmitHandler}
        >
          <label htmlFor="Enter-new-password" className="my-3 fw-bold">
            Enter New Password
          </label>
          <br />
          <input
            className={classes["profile-change-password"]}
            type="password"
            name="enter-new-password"
            id="enter-new-password"
            placeholder="Enter New Password"
            ref={newpasswordRef}
            required
          />

          {/* confirm password */}
          <br />
          <label htmlFor="confirm-password" className="my-3 fw-bold">
            Confirm password
          </label>
          <br />
          <input
            className={classes["profile-confirm-password"]}
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Please Confirm Password"
            ref={confirmPasswordRef}
            required
          />

          {islodaing && (
            <p className="text-danger fw-bold mt-3">sending request...</p>
          )}

          {passwordChangedFeedBack && (
            <p className="text-info fw-bold mt-3">
              password is changed succesfully
            </p>
          )}

          <p className="text-danger fw-bold mt-3">
            {passwordMatch ? "password do not match" : error}
          </p>
          <div className="text-center mt-4">
            <button className={classes["change-password"]} type="submit">
              change password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
