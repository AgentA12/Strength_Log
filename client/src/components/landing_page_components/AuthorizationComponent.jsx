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
  Text,
  Center,
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
      shadow="lg"
      radius="md"
      withBorder
      sx={{ maxWidth: 450, margin: "auto", marginTop: 120 }}
    >
      <Flex justify={"space-between"}>
        <Title order={2}>ACCOUNT {type.toUpperCase()}</Title>
        <AiOutlineThunderbolt size={40} />
      </Flex>

      <form onSubmit={(event) => handleSubmit(event)}>
        <TextInput
          autoFocus
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

        <Text
          sx={(theme) => ({
            color: theme.colors.red[6],
            marginTop: 5,
          })}
        >
          {errorMessage && errorMessage}
        </Text>

        <Button
          mt={10}
          type="submit"
          variant="outline"
          loading={loginLoading ? loginLoading : signupLoading}
        >
          {type.toUpperCase()}
        </Button>
      </form>

      <Text
        span
        sx={(theme) => ({
          marginTop: 12,
          display: "inline-block",
          "&:hover": {
            cursor: "pointer",
            color: theme.colors.blue[5],
          },
        })}
        td="underline"
        onClick={() => handleTypeSwitch(type === "Login" ? "Signup" : "Login")}
      >
        {type === "Login" ? "Signup instead" : "Login"}
      </Text>
    </Card>
  );
}
