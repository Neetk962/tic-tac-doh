import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import dohimg from "../../assets/images/doh.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <div className="flex items-center">
          <h1 className="inline-flex simpsonfont text-yellow-300 font-bold text-6xl items-center ">
            Tic Tac <img id="dohimg" src={dohimg} alt="doh" />
          </h1>
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
              <section className="flex simpsonfont justify-between text-4xl text-textDecorationLine: underline items-stretch pb-12">
                <section className="flex">
                  <Link to="/">Home</Link>
                </section>
                <section>
                  <Link to="/login">Login</Link>
                </section>
                <section>
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
