import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/graphql/mutations";

export default function Login() {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
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

  function handleSubmit(event) {
    event.preventDefault();

    loginUser({
      variables: {
        ...formState,
      },
    });
  }

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="max-w-4xl bg-overlay p-8 rounded-lg ">
      <form className="" onSubmit={(event) => handleSubmit(event)}>
        <h5>Login</h5>
        <div className="mb-6">
          <label
            htmlFor="username-success"
            className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >
            Your Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            className="bg-overlay border border-green-500  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
            placeholder="Bonnie Green"
          />
          <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            <span className="font-medium">Alright!</span> Username available!
          </p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="bg-overlay border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
            placeholder="Bonnie Green"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span> Username Password is
            incorrect
          </p>
        </div>
        <hr className="my-3 " />
        <button
          type="submit"
          className="w-fit text-background bg-gradient-to-r from-primary via-primary to-primary_faded hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                focus:ring-primary_faded font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 "
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
