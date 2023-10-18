import React from "react";
import "./ScoreBoard.css";
import X from "../../assets/images/duff.png";
import O from "../../assets/images/donut.png";

export const ScoreBoard = ({ score, xPlayer }) => {
  const { xScore, oScore } = score;

  return (
    <section className="scoreboard">
      <span className={`score x-score ${!xPlayer && "inactive"}`}>
        <img src={X} className="m-2 pr-8" /> {xScore}
      </span>
      <span className={`score o-score ${xPlayer && "inactive"}`}>
        <img src={O} className="m-2 pr-8" /> {oScore}
      </span>
    </section>
  );
};
