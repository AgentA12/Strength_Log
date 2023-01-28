import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/graphql/mutations";
import Auth from "../../utils/auth/auth";
import { Button, Input, Title, PasswordInput } from "@mantine/core";
import { AiFillLock } from "react-icons/ai";

export default function Login() {
  const [loginUser, { error }] = useMutation(LOGIN_USER, {
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
    try {
      event.preventDefault();

      const mutationResponse = await loginUser({
        variables: {
          ...formState,
        },
      });

      Auth.login(mutationResponse.data.login.token);
    } catch (error) {}
  }

  return (
    <div className="flex h-90 justify-center items-start">
      {/* <img src={`${landingImage}`} alt="electric wieght lifter" className="absolute landing-img left-16 " /> */}
      <div className="w-96  mx-2 p-8 rounded-lg border-r-4  mt-20 shadow-sm shadow-gray-500">
        <form onSubmit={(event) => handleSubmit(event)}>
          <Title order={3} className="mb-4">
            ACCOUNT LOGIN
          </Title>

          <Input.Wrapper withAsterisk label="Username">
            <Input onChange={handleChange} name="username" required />
          </Input.Wrapper>

          <PasswordInput
            onChange={handleChange}
            name="password"
            required
            label="Password"
            withAsterisk
            icon={<AiFillLock />}
          />

          <p className="mt-3 py-1  text-error">{error && error.message}</p>

          <Button
            type="submit"
            variant="outline"
            className="my-3"
            color={"grape"}
          >
            Login
          </Button>
        </form>
        <Link to="/Signup" className="underline">
          Sign up instead
        </Link>
      </div>
    </div>
  );
}
