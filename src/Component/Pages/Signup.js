import React from "react";
import { Link } from "react-router-dom";
import classes from "./Pages.module.css";
import { Button } from "react-bootstrap";
const Signup = () => {
  return (
    <div className={classes["main-div-pages"]}>
      <div className={classes.innderDiv}>
        <form action="" className={classes["login-form"]}>
          <h1 className="display-4 text-light fw-bold">Sign Up</h1>
          <div>
            <label htmlFor="username">username </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">password </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <divc className="mt-3">
            <Button type="submit" className="btn-danger ">
              Sign Up
            </Button>
          </divc>
          <div className="mt-2">
            <span className="text-light mx-2">Already have an account ? </span>{" "}
            <Link to={"/login"}>
              <Button className="btn-sm">Login </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
