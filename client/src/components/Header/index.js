import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header>
            <div>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/game">Play</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
