import React from "react";
import classes from "./Tours.module.css";

const tourData = [
  {
    id:1,
    date: "Jul 16",
    place: "detroit,mi",
    venue: "dte energy music theatre",
    buyTicket: "buy tickets",
  },
  {
    id:2,
    date: "Jul 19",
    place: "toronto,on",
    venue: "budweiser stage",
    buyTicket: "buy tickets",
  },
  {
    id:3,
    date: "Jul 22",
    place: "bristow,va",
    venue: "jiggy lube live",
    buyTicket: "buy tickets",
  },
  {
    id:4,
    date: "Jul 29",
    place: "pehonix,az",
    venue: "ak-chin pavilion",
    buyTicket: "buy tickets",
  },
{
    id:5,
    date: "aug 2",
    place: "las vegas,nv",
    venue: "t-mobile arena",
    buyTicket: "buy tickets",
  },
  {
    id:6,
    date: "aug 7",
    place: "concord,ca",
    venue: "concord pavilion",
    buyTicket: "buy tickets",
  },
];
const Tours = (props) => {
  return (
    <div className={classes.tour_main}>
      <h1>Tours</h1>
      {tourData.map((details) => {
        const { date, place, venue, buyTicket,id } = details;
        return (
          <div className={classes.vanue_Deatils} key={id}>
            <div className={classes.date_and_venue}>
              <span className={classes.date}>{date}</span>
              <span className={classes.place}>{place}</span>
              <span className={classes.venue}>{venue}</span>
            </div>
            <button>{buyTicket}</button>
          </div>
        );
      })}
    </div>
  );
};

export default Tours;
