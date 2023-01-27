import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/graphql/mutations";
import Auth from "../../utils/auth/auth";
import { Button, Input, Title, PasswordInput } from "@mantine/core";
import { AiFillLock } from "react-icons/ai";

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
      <div className="w-96  mx-2 p-8 rounded-lg border-r-gray-600  bg-overlay_two border-r-4  mt-20">
        <form onSubmit={(event) => handleSubmit(event)}>
          <Title order={3} className="mb-4">
            ACCOUNT SIGNUP
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

          <p className="mt-3 py-1  text-error">{error && error.message}</p>

          <Button
            type="submit"
            variant="outline"
            className="my-3"
            color={"grape"}
          >
            Signup
          </Button>
        </form>

        <Link to="/Login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
