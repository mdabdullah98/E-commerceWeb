import React from "react";
import classes from "./About.module.css";
import Footer from "../UI/Footer/Footer";
import MianContent from "../UI/Main/MianContent";
import Header from "../UI/Header/Header";
const About = (props) => {
  const displaySocialMediaAtStoreTab = true;
  return (
    <>
      <Header />
      <div className={classes["main-about-div"]}>
        <div className={classes["main-content-compo"]}>
          <MianContent />
        </div>
        <div className={classes["about-sec"]}>
          <h1 className={classes.title}>About</h1>
          <div className={classes["siteImage-siteInfo"]}>
            <img
              src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png"
              alt="site_image"
            />

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              doloremque expedita voluptate consectetur qui recusandae unde
              porro! Officiis corrupti non sed magnam dolores iure possimus
              excepturi nihil assumenda, saepe consectetur illum est ipsam
              accusamus dicta doloribus repellendus laboriosam velit minus quas
              eum mollitia? Dicta assumenda neque dolore maiores pariatur
              tempore.
              <br />
              excepturi of the blessed sufferings. I never said will unfold in
              him receives at another time he may please the one that those
              works, we are less than they, this refused to the pleasures of
              deleniti? Those are! Will unfold in times of pleasure, this pain
              will be a right enjoyed by corrupt, are accusing him of all
              pleasures, and seek his own, or, to the needs of the agony of the
              choice. We hate the fellow. Lorem ipsum dolor, sit amet
              consectetur rebates. The distinction, that arise from or to. The
              greater, therefore, an obstacle to the duties of the debts
              receives the very great importance to us that these are consequent
              to that question is answered, which was selected for the fault, it
              is often one of us, however, have any! Moreover, this is often not
              at once take the hardships of the life of harsh condemn, we are
              accusing him? Him whom something large
            </p>
          </div>
        </div>
        <Footer displaySocialMediaAtStoreTab={displaySocialMediaAtStoreTab} />
      </div>
    </>
  );
};

export default About;
