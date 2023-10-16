import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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
    <main>
      <div>
        <div>
          <h2 className="justify-center">Login</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
                <br />
                <input placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
                <button type="submit">Submit</button>
              </form>
            )}
            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
