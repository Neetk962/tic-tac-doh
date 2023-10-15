import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer>
            <div>
                {location.pathname !== "/" && (
                    <button onClick={() => navigate("/")}>Home</button>
                )}
            </div>
        </footer>
    );
};

export default Footer;
