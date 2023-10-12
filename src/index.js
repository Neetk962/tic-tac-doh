import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 4000;
const INDEX = "index.html";

const app = express();
app.use((_req, res) => res.sendFile(INDEX, { root: __dirname }));

const server = app.listen(PORT, () => console.log("Listening"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
