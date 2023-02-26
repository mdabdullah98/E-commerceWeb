import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import HeaderCart from "../../HeaderCart/HeaderCart";
import { UseProdutsCtx } from "../CartContext/ContextApiComponent";

import "./Header.css";

const Header = (props) => {
  const authCrtx = UseProdutsCtx();
  const isLoggedIn = authCrtx.authorization.isLoggedIn;
  const data = authCrtx.authorization.data;

  const logoutHandler = () => {
    authCrtx.authorization.logout();
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" className="navbar">
        <Container className="my-header">
          <NavLink to={"/"} className="navbar-brand">
            The Music Hub
          </NavLink>
          <Nav className="nav-links">
            <NavLink to={"/"}>
              Home
              <span></span>
            </NavLink>
            <NavLink to={"/store"}>
              Store
              <span></span>
            </NavLink>
            <NavLink to={"/about"}>
              About
              <span></span>
            </NavLink>
            <NavLink to={"/contactus"}>
              Contact us
              <span></span>
            </NavLink>
          </Nav>
          <Nav className="mr-auto cart_component">
            {/* this is for the login logout and profile pages */}
            <Nav className="pages-link">
              {!isLoggedIn && <NavLink to={"/login"}>Login</NavLink>}
              {isLoggedIn && <NavLink to={"/profile"}>profile</NavLink>}
              {isLoggedIn && (
                <p className="m-0 text-light">{data ? data.email : ""}</p>
              )}
              {isLoggedIn && (
                <Link to={"/"} onClick={logoutHandler}>
                  Log out
                </Link>
              )}
            </Nav>
            {/* this is for the login logout and profile pages */}
            {props.showHeaderCart && (
              <HeaderCart
                ShowOverLAyFuncToHeaderCart={props.ShowOverLAyFuncToHeader}
              />
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
