import React from "react";
import LatesAlbum from "../Home/LatestAlbum/LatesAlbum.js";
import Tours from "../Home/Tours/Tours.js";
import Footer from "../UI/Footer/Footer.js";
import Header from "../UI/Header/Header.js";
const Home = (props) => {
  return (
    <>
      <Header />
      <LatesAlbum />
      <Tours />
      <Footer />
    </>
  );
};

export default Home;
