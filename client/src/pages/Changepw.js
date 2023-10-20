import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { CHANGE_USER } from "../utils/mutations";



const ChangePw = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [changePassword, { error, data }] = useMutation(CHANGE_USER);
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
        const { data } = await changePassword({
          variables: { ...formState },
        });
        
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
          <div id="changePassword" className="backgroundColor: bg-pink-400 w-[375px] justify-center">
            <h2 className="bg-amber-300 text-center font-bold">Update Password</h2>
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
                      <button type="submit">Change Password</button>
                    </section>
                  </form>
                </section>
              )}
              {error && <div>{error.message}</div>}
            </div>
          </div>
        </div>
      </main>
    );
  };
  export default ChangePw;
  