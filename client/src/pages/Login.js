import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import simps_door from "../assets/images/simps_door.png";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <main className="simpsonfont flex flex-col items-center max-w-[1040] m-auto md:pl-20 p-3 py-10">
      <div>
        <div id="login" className="backgroundColor: bg-pink-400 w-[375px] justify-center">
          <h2 className="bg-amber-300 text-center font-bold">Login</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <section>
                <form onSubmit={handleFormSubmit}>
                  <section className="rounded flex flex-col m-3 w-[300px] p-3">
                    <input placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
                  </section>
                  <section className="rounded flex flex-col m-3 w-[300px] p-3">
                    <input placeholder="######" name="password" type="password" value={formState.password} onChange={handleChange} />
                  </section>
                  <section className="cursor-pointer bg-amber-300 flex flex-col items-center">
                    <button type="submit">Submit</button>
                  </section>
                </form>
              </section>
            )}
            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
      <section className="pt-11 max-w-full">
        <img className="object-center" src={simps_door} id="door" />
      </section>
    </main>
  );
};

export default Login;
