import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dohimg from "../../assets/doh.png"

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header>
            <div>
                <div>
                    <h1 className='simpsonfont text-amber-400'>Tic Tac <img id="dohimg" src={dohimg} alt="doh" /></h1>
                    
                </div>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Welcome, {Auth.getProfile().data.username}!</span>
                            <Link to="/game">Play</Link>
                            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
