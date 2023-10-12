import React from "react";

import "./ScoreBoard.css";

export const ScoreBoard = ({ score, xPlayer }) => {
  const { xScore, oScore } = score;

  return (
    <section className="scoreboard">
      <span className={`score x-score ${!xPlayer && "inactive"}`}>X - {xScore}</span>
      <span className={`score o-score ${xPlayer && "inactive"}`}>O - {oScore}</span>
    </section>
  );
};
