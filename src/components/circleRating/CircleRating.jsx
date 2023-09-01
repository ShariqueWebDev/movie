import React from "react";
import "./CircleRating.scss";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircleRating({ rating }) {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating || "9.8"}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating > 7 ? "green" : "orange",
        })}
      />
    </div>
  );
}

export default CircleRating;
