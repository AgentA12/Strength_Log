import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/graphql/mutations";
import Auth from "../utils/auth/auth";
import {
  Button,
  Title,
  PasswordInput,
  TextInput,
  Card,
  Flex,
  Text,
} from "@mantine/core";
import { AiOutlineThunderbolt, AiFillLock } from "react-icons/ai";

const linkStyles = {
  marginTop: 12,
  display: "inline-block",
  cursor: "pointer",
  width: "fit-content",
};

export default function AuthorizationComponent(): React.JSX.Element {
  const [type, setType] = useState("Login");

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | false>(false);

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

  function handleFormChange({ target }: {target: HTMLInputElement}) {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  }

  function handleTypeSwitch(type: string) {
    type === "Login" ? setType("Login") : setType("Signup");

    setError(false);
    setFormState({
      username: "",
      password: "",
    });
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    setError(false);
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
        if (!formState.password.trim()) {
          setError("invalid password");
        }
        const { data } = await addUser({
          variables: {
            ...formState,
          },
        });

        Auth.login(data.createUser.token);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <Card
      shadow="lg"
      radius="md"
      withBorder
      style={{
        maxWidth: 450,
        margin: "auto",
        marginTop: 120,
      }}
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
          onFocus={() => setError(false)}
          error={
            error === "incorrect username"
              ? error
              : error === "Username is taken" && error
          }
          disabled={loginLoading ? loginLoading : signupLoading}
        />

        <PasswordInput
          icon={<AiFillLock size={16} />}
          onChange={handleFormChange}
          name="password"
          value={formState.password}
          label="Password"
          withAsterisk
          onFocus={() => setError(false)}
          error={error === "incorrect password" && error}
          disabled={loginLoading ? loginLoading : signupLoading}
        />

        <Button
          mt={10}
          type="submit"
          loading={loginLoading ? loginLoading : signupLoading}
        >
          {type.toUpperCase()}
        </Button>
      </form>

      <Text
        span
        style={linkStyles}
        td="underline"
        onClick={() => handleTypeSwitch(type === "Login" ? "Signup" : "Login")}
      >
        {type === "Login" ? "Signup instead" : "Login"}
      </Text>
    </Card>
  );
}
