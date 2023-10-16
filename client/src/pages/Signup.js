import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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
    <main>
      <div>
        <div>
          <h2>Signup</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <section>
                  <input placeholder="Your username" name="username" type="username" value={formState.username} onChange={handleChange} />
                </section>
                <section>
                  <input placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
                </section>
                <section>
                  <input placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
                </section>
                <button className="cursor-pointer" type="submit">
                  Submit
                </button>
              </form>
            )}
            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;
