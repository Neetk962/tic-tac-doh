import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import simps_house from "../../assets/images/simps_house.png";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <div>{location.pathname !== "/" && <button onClick={() => navigate("/")}></button>}</div>
    </footer>
  );
};

export default Footer;
