import React, { useState } from "react";
import "./Contact.css";

const FormsInput = (props) => {
  const [name, setName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addesMessage, setaddesMessage] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const emailIDHandler = (e) => {
    setEmailID(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onsumbitHandler = async (e) => {
    e.preventDefault();
    if (name && emailID && phoneNumber) {
      const userDeatils = {
        name,
        emailID,
        phoneNumber,
      };
      
      setaddesMessage(true);
      //send post request to google firebase
      const url =
        "https://practice-react-4fd3b-default-rtdb.firebaseio.com/userDetails.json";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userDeatils),
        headers: {
          "Content-Type": "application/json",
        },
      });

  
    } else {
      alert("please add value");
    }
    setTimeout(() => {
      setaddesMessage(false);
    }, 2000);
    setName("");
    setEmailID("");
    setPhoneNumber("");
  };
  return (
    <div className="mainform-div">
      <form action="" onSubmit={onsumbitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={nameHandler}
            value={name}
            placeholder={"your name here"}
          />
        </div>
        <div>
          <label htmlFor="email">Email Id</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={emailIDHandler}
            value={emailID}
            placeholder={"johnsmit@xyz.com"}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <br />
          <input
            type="number"
            id="phoneNumber"
            onChange={phoneNumberHandler}
            value={phoneNumber}
            placeholder={"add your phone number"}
          />
        </div>
        <div className="show-message">
          {addesMessage && <p>sending request ... </p>}
        </div>
        <div className="submit-button">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormsInput;
