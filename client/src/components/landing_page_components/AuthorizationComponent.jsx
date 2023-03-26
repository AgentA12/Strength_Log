import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../../utils/graphql/mutations";
import Auth from "../../utils/auth/auth";
import {
  Button,
  Title,
  PasswordInput,
  TextInput,
  Card,
  Flex,
} from "@mantine/core";
import { AiOutlineThunderbolt, AiFillLock } from "react-icons/ai";

export default function AuthorizationComponent() {
  const [type, setType] = useState("Login");

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

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

  function handleFormChange({ target }) {
    setFormState({
      ...formState,
      [target.name]: target.value.trim(),
    });
  }

  function handleTypeSwitch(type) {
    type === "Login" ? setType("Login") : setType("Signup");

    setErrorMessage(null);
    setFormState({
      username: "",
      password: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (type === "Login") {
        const { data } = await loginUser({
          variables: {
            ...formState,
          },
        });
        Auth.login(data.login.token);
      } else {
        const { data } = await addUser({
          variables: {
            ...formState,
          },
        });

        Auth.login(data.createUser.token);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <Card
      className={`sm:w-96 max-w-96 mx-5 sm:mx-auto mt-20 transition-all duration-75 ${
        errorMessage && "border-error shadow-md shadow-error"
      }`}
      shadow="sm"
      radius="md"
      withBorder
    >
      <Flex justify={"space-between"}>
        <Title order={2}>ACCOUNT {type.toUpperCase()}</Title>
        <AiOutlineThunderbolt size={40} />
      </Flex>

      <form onSubmit={(event) => handleSubmit(event)}>
        <TextInput
          withAsterisk
          label="Username"
          onChange={handleFormChange}
          name="username"
          required
          value={formState.username}
          onFocus={() => setErrorMessage(null)}
        />

        <PasswordInput
          icon={<AiFillLock size={16} />}
          onChange={handleFormChange}
          name="password"
          placeholder="Password"
          value={formState.password}
          label="Password"
          withAsterisk
          onFocus={() => setErrorMessage(null)}
        />

        <p className="text-error font-bold transition-all duration-75">
          {errorMessage && errorMessage}
        </p>

        <Button
          type="submit"
          variant="outline"
          color={"grape"}
          loading={loginLoading ? loginLoading : signupLoading}
        >
          {type.toUpperCase()}
        </Button>
      </form>

      {type === "Login" ? (
        <p
          className="cursor-pointer w-fit hover:underline"
          onClick={() => handleTypeSwitch("Signup")}
        >
          Signup instead
        </p>
      ) : (
        <p
          className="cursor-pointer w-fit hover:underline"
          onClick={() => handleTypeSwitch("Login")}
        >
          Login
        </p>
      )}
    </Card>
  );
}
