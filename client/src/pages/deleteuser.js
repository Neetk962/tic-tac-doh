import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../utils/mutations";


// const Deleteuser = () => {
//     const [formState, setFormState] = useState({ email: "", password: "" });
//     const [deleteuser, { error, data }] = useMutation(DELETE_USER);
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormState({
//         ...formState,
//         [name]: value,
//       });
//     };
    
//     return (
      
// <button type="submit">Delete User</button>
                   
//     );
//   };
//   export default Deleteuser;
  