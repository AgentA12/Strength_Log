import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/graphql/mutations";
import Auth from "../utils/auth/auth";
import { Button, Title, PasswordInput, TextInput, Card } from "@mantine/core";
import { AiOutlineThunderbolt, AiFillLock } from "react-icons/ai";
import CalendarComponent from "./calendar/Calendar";

export default function AuthorizationComponent({ type, setType }) {
  const [errorMessage, setErrorMessage] = useState("");

  const [addUser, { loading: signupLoading }] = useMutation(ADD_USER, {
    variables: {
      username: "",
      password: "",
    },
  });

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER, {
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
      [target.name]: target.value.trim(),
    });
  }

  function handleTypeSwitch(type) {
    if (type === "login") {
      setType("login");
      setErrorMessage(null);
    } else {
      setType("Signup");
      setErrorMessage(null);
    }
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
      setErrorMessage(error.message);
    }
  }

  return (
    <Card
      className="sm:w-96 max-w-96 mx-5 sm:mx-auto mt-20"
      shadow="sm"
      radius="md"
      withBorder
    >

      <CalendarComponent />
      <form onSubmit={(event) => handleSubmit(event)}>
        <Title order={2}>
          ACCOUNT {type.toUpperCase()}
          <AiOutlineThunderbolt size={20} />
        </Title>

        <TextInput
          withAsterisk
          label="Username"
          onChange={handleChange}
          name="username"
          required
        />

        <PasswordInput
          icon={<AiFillLock size={16} />}
          onChange={handleChange}
          name="password"
          placeholder="Password"
          label="Password"
          withAsterisk
        />

        <p className="text-error">{errorMessage && errorMessage}</p>

        <Button
          type="submit"
          variant="outline"
          color={"grape"}
          loading={loginLoading ? loginLoading : signupLoading}
        >
          {type.toUpperCase()}
        </Button>
      </form>

      {type === "login" ? (
        <p
          className="cursor-pointer w-fit"
          onClick={() => handleTypeSwitch("signup")}
        >
          Signup instead
        </p>
      ) : (
        <p
          className="cursor-pointer w-fit"
          onClick={() => handleTypeSwitch("login")}
        >
          Login
        </p>
      )}
    </Card>
  );
}
