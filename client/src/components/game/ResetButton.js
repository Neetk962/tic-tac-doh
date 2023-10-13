import React from "react";

import "./ResetButton.css";

export const ResetButton = ({ resetGameboard }) => {
  return (
    <button className="reset-btn" onClick={resetGameboard}>
      Play Again
    </button>
  );
};
