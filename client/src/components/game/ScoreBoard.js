import React from "react";
import "./ScoreBoard.css";
import X from "../../assets/images/duff.png";
import O from "../../assets/images/donut.png";

export const ScoreBoard = ({ score, xPlayer }) => {
  const { xScore, oScore } = score;

  return (
    <section className="scoreboard">
      <span className={`score x-score ${!xPlayer && "inactive"}`}>
        <img src={X} /> {xScore}
      </span>
      <span className={`score o-score ${xPlayer && "inactive"}`}>
        <img src={O} /> {oScore}
      </span>
    </section>
  );
};
