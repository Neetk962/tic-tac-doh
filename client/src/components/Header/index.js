import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dohimg from "../../assets/images/doh.png"

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header>
            <div>
                <div className='header-container'>
                    <div className='title-container'>
                        <h1 className='simpsonfont text-amber-400 title-container-font'>Tic Tac</h1>
                    </div>
                    <div className='title-image-container'>
                        <img className='title-image' id="dohimg" src={dohimg} alt="doh" />
                    </div>
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
            </div >
        </header >
    );
};

export default Header;
