import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dohimg from "../../assets/images/doh.png";
import soundFile from "../../assets/sounds/boring.mp3";
import "./Header.css";

// function playSound() {
//     const audio = new Audio(soundFile);
//     audio.play();
// }
const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        const audio = new Audio(soundFile);
    audio.play();
        setTimeout(() => {
            Auth.logout();
          }, "2000");
    
    };
  return (
    <header>
      <div className="container mx-auto"> 
        <div id="header">
          <h1 className="content-center simpsonfont text-yellow-300 font-bold text-6xl [text-shadow:_0_3px_0_rgb(0_0_0_/_40%)]">
            Tic Tac <img id="dohimg" src={dohimg} alt="doh" />
          </h1>
        </div>
        <div className="container sm:mx-auto">
          {Auth.loggedIn() ? (
            <div className="game-nav container">
              <span className="simpsonfont text-yellow-800 font-bold text-2xl">Welcome, {Auth.getProfile().data.username}!</span>

              <Link to="/game" className="simpsonfont font-bold text-yellow-800 text-2xl">Play</Link>
              <button className="btn btn-lg btn-light simpsonfont font-bold text-yellow-800 text-2xl" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <section className="flex simpsonfont justify-between text-4xl text-textDecorationLine: underline items-stretch pb-12">
                <section className="flex pl-5">
                  <Link to="/">Home</Link>
                </section>
                <section>
                  <Link to="/login">Login</Link>
                </section>
                <section className="pr-5">
                  <Link to="/signup">Signup</Link>
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
