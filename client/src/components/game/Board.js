import React from "react";

import { Square } from "./Square";
import "./Board.css";

export const Board = ({ gameboard, onClick }) => {
  return (
    <section className="board">
      {gameboard.map((value, idx) => {
        return <Square key={idx} value={value} onClick={() => value === null && onClick(idx)} />;
      })}
    </section>
  );
};
