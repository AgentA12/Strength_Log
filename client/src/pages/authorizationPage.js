import Login from "../components/miscellaneous/Login";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/graphql/mutations";
import Auth from "../utils/auth/auth";
import { Button, Input, Title, PasswordInput } from "@mantine/core";
import { AiFillLock, AiOutlineThunderbolt } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function AuthorizationPage() {
  let location = useLocation();
  console.log(location);
  // get type from url
  return <AuthorizationComponent type={"login"} />;
}

// < authorizationComponent  type={'login'} />

// if type is equal to login use LOGIN_USER else use ADD_USER

// type is a string, either login or signup. used to determine either login  or signup request
function AuthorizationComponent({ type }) {
  const [errorMessage, setErrorMessage] = useState();
  const [addUser, { loading: signupLoading, error: signupError }] = useMutation(
    ADD_USER,
    {
      variables: {
        username: "",
        password: "",
      },
    }
  );

  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN_USER,
    {
      variables: {
        username: "",
        password: "",
      },
    }
  );

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
    try {
      if (type === "login") {
        const mutationResponse = await loginUser({
          variables: {
            ...formState,
          },
        });
        Auth.login(mutationResponse.data.login.token);
      } else {
        const mutationResponse = await addUser({
          variables: {
            ...formState,
          },
        });

        Auth.login(mutationResponse.data.createUser.token);
      }
    } catch (error) {
      setErrorMessage("incorrect credentials");
    }
  }

  return (
    <div className="flex h-90 justify-center items-start">
      <div className="w-96 mx-2 p-8 rounded-lg border-r-4 mt-20 shadow-sm shadow-gray-500">
        <form onSubmit={(event) => handleSubmit(event)}>
          <Title order={3} className="mb-4 flex gap-1">
            ACCOUNT {type.toUpperCase()}
            <AiOutlineThunderbolt size={20} />
          </Title>

          <Input.Wrapper withAsterisk label="Username">
            <Input onChange={handleChange} name="username" required />
          </Input.Wrapper>

          <PasswordInput
            onChange={handleChange}
            name="password"
            icon={<AiFillLock size={16} />}
            label="Password"
            withAsterisk
          />

          <p className="mt-3 py-1 text-error">{errorMessage && errorMessage}</p>

          <Button
            type="submit"
            variant="outline"
            className="my-3"
            color={"grape"}
            loading={loginLoading}
          >
            {type}
          </Button>
        </form>

        <Link to={"/signup"} className="underline hover:text-gray-600">
          {type === "login" ? "Signup instead" : "Login"}
        </Link>
      </div>
    </div>
  );
}
