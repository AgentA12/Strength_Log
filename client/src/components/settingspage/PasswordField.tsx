import { Fieldset, Button, Text, Divider, PasswordInput } from "@mantine/core";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { UserContext, UserInfo } from "../../contexts/userInfo";
import { useState, useContext } from "react";

import { notifications } from "@mantine/notifications";

const IS_CORRECT_PASS = gql`
  query ($userID: ID!, $password: String) {
    isCorrectPass(userID: $userID, password: $password)
  }
`;

const UPDATE_PASSWORD = gql`
  mutation ($userID: ID!, $password: String!) {
    updatePassword(userID: $userID, password: $password)
  }
`;

export default function PasswordField() {
  const userInfo = useContext<UserInfo>(UserContext);

  const userID = userInfo?.data._id;

  const [password, setPassword] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);

  const [checkPassword] = useLazyQuery(IS_CORRECT_PASS);
  const [changePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  async function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    e.preventDefault();

    setPasswordOld(e.currentTarget.value);

    const res = await checkPassword({
      variables: {
        userID: userID,
        password: e.currentTarget.value,
      },
    });

    if (res.data.isCorrectPass === true) {
      setPasswordIsCorrect(true);
    } else {
      setPasswordIsCorrect(false);
    }
  }

  async function handleSubmit() {
    if (password.length < 4) return;

    const res = await changePassword({
      variables: {
        password: password,
        userID: userID,
      },
    });
    if (res.data.updatePassword === true) {
      notifications.show({
        title: "Password change",
        message: `Your Password was succesfully changed`,
      });
      setPassword("");
      setPasswordOld("");
    } else {
      notifications.show({
        title: "Password change",
        message: `There was an error changing your password`,
        color: "red.6",
      });
    }
  }

  return (
    <Fieldset
      pt={2}
      legend={
        <Text fw={600} size="xl">
          Password
        </Text>
      }
      radius="md"
    >
      <form>
      <PasswordInput
        disabled={loading}
        value={passwordOld}
        onChange={handleChange}
        label={
          <Text size="sm" c="dimmed">
            Enter your password
          </Text>
        }
      />

      <Divider my={12} />

      
        <PasswordInput
          disabled={!passwordIsCorrect || loading}
          value={password}
          error={!!error}
          onChange={(event) => setPassword(event.currentTarget.value)}
          label={
            <Text size="sm" c="dimmed">
              Enter your{" "}
              <Text span fw={800} size="xl">
                new
              </Text>{" "}
              password
            </Text>
          }
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          disabled={!passwordIsCorrect}
          mb={0}
          mt={5}
        >
          Save
        </Button>
      </form>
    </Fieldset>
  );
}
