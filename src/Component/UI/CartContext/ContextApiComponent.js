import React, { createContext, useContext, useEffect, useState } from "react";

let logoutTimer;

const ContextApi = createContext({
  // we are giving refrence of key and value og our context obj  just for the suggestion
  productsArr: [
    {
      id: 1,
      title: "Colors",

      price: 100,

      imageUrl: "url",
    },
  ],

  forCartItems: (objItems, id) => {},
  myitems: "items",
  // autorization part start from here, this is just for getting suggestion
  authorization: {
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    data: {},
  },
  getDataFromcrud: () => {},
  removeItem: () => {},
});

//calculate helper function will be written over here
const calculateRemainingTime = (expirationTime) => {
  const currentTIme = new Date().getTime();
  const adjustedRemainingTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedRemainingTime - currentTIme;
  return remainingTime;
};

// make a helper function which retrieve only valid token
const retrieveValidToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const ContextProvider = ({ children }) => {
  const [items, setitems] = useState([]);

  let tokenData = retrieveValidToken();
  let initalValue;
  if (tokenData) {
    initalValue = tokenData.token;
  }

  const [token, settoken] = useState(initalValue);
  // usestate for stroing token which we are recieving in login .then(data=>{})

  // these all are helper function
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    settoken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("responseData");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setitems([]);
  };

  const loginHandler = (token, expirationTime, data) => {
    settoken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("responseData", JSON.stringify(data));
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //helper funtion for the remove item over here
  const removeItem = (id) => {
    let filterItems = items.filter((item) => {
      return item.id !== id;
    });
    setitems(filterItems);
  };
  //contextComponent.Provider value starts from here
  const storage = {
    productsArr: [
      {
        id: 1,
        title: "Colors",

        price: 100,

        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      },

      {
        id: 2,
        title: "Black and white Colors",

        price: 50,

        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      },

      {
        id: 3,
        title: "Yellow and Black Colors",

        price: 70,

        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      },

      {
        id: 4,
        title: "Blue Color",

        price: 100,

        imageUrl:
          "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      },
    ],
    forCartItems: function (objItems, id) {
      for (let ele in items) {
        if (items[ele].id === id) {
          alert("items is already present");
          return;
        }
      }
      setitems((prev) => {
        return [objItems, ...prev];
      });
      postDatatToCrudApi(objItems);
    },

    myitems: items,

    singleProductsitrms: [
      { images: `../Images/41gAZdQUyZL.jpg` },
      { images: `../Images/vivo-v23-pro-10.jpg` },
      { images: `../Images/61OiHUy-bfS._SX679_.jpg` },
      { images: `../Images/71xm2-yb7L._SX522_.jpg` },
      { images: `../Images/_117842784_lg.jpg` },
      { images: `../Images/61OiHUy-bfS._SX679_.jpg` },
    ],

    //authentication part start, here we store the token which we are recieving from firebase
    authorization: {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
      data: JSON.parse(localStorage.getItem("responseData")),
    },

    // we are wrtiing a helper function on top for deleting the item so when the use click on the remove button so the item should be delete from the cart
    removeItem: removeItem,
  };

  //effect will log out user automatically when the times out
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData]);

  //posting data to crud crud
  const userEmeialID = storage.authorization.isLoggedIn
    ? storage.authorization.data.email.replace("@", "").replace(".", "")
    : null;
  let url = `https://crudcrud.com/api/3d732f20aa7240ff822d07002803dd5a/${userEmeialID}`;
  console.log(userEmeialID);
  function postDatatToCrudApi(objItem) {
    if (storage.authorization.isLoggedIn) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(objItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return;
  }

  //fecthing data from the crud crud
  async function getDatatFromCrudApi(url) {
    if (storage.authorization.isLoggedIn) {
      const res = await fetch(url);
      const data = await res.json();
      setitems(data);
      console.log(data);
    }
    return;
  }

  // get request to crud crud so when user succesful login and when token gets updated  the so the the useeffect will re render the cartover component and the data will be fecthed.
  useEffect(() => {
    if (token) {
      getDatatFromCrudApi(url);
    }
  }, [token]);

  return <ContextApi.Provider value={storage}>{children}</ContextApi.Provider>;
};

const UseProdutsCtx = () => {
  return useContext(ContextApi);
};

export { ContextApi, ContextProvider, UseProdutsCtx };
