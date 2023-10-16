import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dohimg from "../../assets/images/doh.png"
import soundFile from "../../assets/sounds/boring.mp3";

// function playSound() {
//     const audio = new Audio(soundFile);
//     audio.play();
// }
const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        const audio = new Audio(soundFile);
    audio.play();
    };
    return (
        <header>
            <div>
                <div className="flex-row">
                    <h1 className='simpsonfont text-amber-400 title'>Tic Tac </h1>
                    <img id="dohimg" src={dohimg} alt="doh" />
                    
                </div>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Welcome, {Auth.getProfile().data.username}!</span>
                            <Link to="/game">Play</Link>
                            <button 
                            className="btn btn-lg btn-light m-2" onClick={logout}>
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
