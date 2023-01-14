import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/graphql/mutations";
import Auth from "../../utils/auth/auth";

export default function Signup() {
  const [addUser, { error }] = useMutation(ADD_USER, {
    variables: {
      username: "",
      password: "",
    },
  });

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  function handleChange({ target }) {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const mutationResponse = await addUser({
      variables: {
        ...formState,
      },
    });

    Auth.login(mutationResponse.data.createUser.token);
  }

  return (
    <div className="flex h-90 justify-center items-start">
      <div className="w-96 bg-overlay mx-2 p-8 rounded-lg border-r-primary border-r-4  mt-20">
        <form className="" onSubmit={(event) => handleSubmit(event)}>
          <h5 className="mb-5 font-medium text-lg">ACCOUNT SIGNUP</h5>
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-300 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
            <p className="my-2 text-error">{error && error.message}</p>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-300 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="mb-2 bg-overlay  text-primary_faded  py-2 px-4 border border-gray-600 rounded shadow hover:bg-primary_faded hover:bg-opacity-10 hover:border-opacity-10 hover:border-primary_faded transition-colors duration-100 whitespace-nowrap w-full text-center"
          >
            Signup
          </button>

          <p
            className="my-1 py-1 
          border-t text-error border-primary"
          ></p>
        </form>

        <Link to="/Login" className="hover:text-primary underline ">
          Login
        </Link>
      </div>
    </div>
  );
}
