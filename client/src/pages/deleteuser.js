import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../utils/mutations";

const DeleteUser = () => {
  const [formState, setFormState] = useState({ password: "" });
  const [deleteuser, { error, data }] = useMutation(DELETE_USER);
  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormState({
  //       ...formState,
  //       [name]: value,
  //     });
  //   };
  const handleDelete = async (event) => {
    try {
      const { data } = await deleteuser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
    setFormState({
      password: "",
    });
  };

  return (
    <div>
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <button type="submit" onClick={handleDelete}>
          Delete User
        </button>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};
export default DeleteUser;
