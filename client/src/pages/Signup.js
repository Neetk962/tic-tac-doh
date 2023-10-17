import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import chalkboard from "../assets/images/chalkboard.png";

const Signup = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser, { error, data }] = useMutation(ADD_USER);
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
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <main className="simpsonfont flex flex-col items-center max-w-[1040] m-auto md:pl-20 p-3 py-10">
      <div>
        <div id="signup" className="backgroundColor: bg-pink-400 w-[375px] justify-center">
          <h2 className="bg-amber-300 text-center font-bold">Sign Up</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <section>
                <form onSubmit={handleFormSubmit}>
                  <section className="rounded flex flex-col m-3 w-[300px] p-3">
                    <input placeholder="Your username" name="username" type="username" value={formState.username} onChange={handleChange} />
                  </section>
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
      <section className="pt-11 min-w-max">
        <img className="object-center" src={chalkboard} id="chalkboard" />
      </section>
    </main>
  );
};
export default Signup;
