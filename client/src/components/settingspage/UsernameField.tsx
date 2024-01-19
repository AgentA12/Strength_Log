import { TextInput, Text, Fieldset, Button } from "@mantine/core";
import { gql } from "@apollo/client";
import { useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "@mantine/form";
import { UserContext, UserInfo } from "../../contexts/userInfo";
import { notifications } from "@mantine/notifications";

const GET_USER_SETTINGS = gql`
  query ($userID: ID!) {
    getUserSettings(userID: $userID) {
      username
    }
  }
`;

const CHANGE_USERNAME = gql`
  mutation ($username: String!, $userID: ID!) {
    changeUsername(username: $username, userID: $userID) {
      confirm
    }
  }
`;

export default function FieldUsername() {
  const userInfo = useContext<UserInfo>(UserContext);

  const userID = userInfo?.data._id;

  const [changeUsername, { loading: l, error: e }] =
    useMutation(CHANGE_USERNAME);

  const {
    data: userSettings,
    loading,
    error,
  } = useQuery(GET_USER_SETTINGS, {
    variables: {
      userID: userID,
    },
  });

  const { values, setValues, ...form } = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value: string) =>
        value.trim().length > 4
          ? null
          : "username must be at lease 5 characters in length",
    },
  });

  useEffect(() => {
    if (!loading && !error && userSettings) {
      setValues({
        username: userSettings.getUserSettings.username || "",
      });
    }
  }, [loading, error, userSettings, setValues]);

  async function handleSubmit() {
    const fieldHasError = form.validateField("username").hasError;
    const fieldValue = form.getInputProps("username").value;

    if (fieldHasError) return;

    if (userSettings.getUserSettings.username === fieldValue) return;

    try {
      const res = await changeUsername({
        variables: {
          userID: userID,
          username: fieldValue.trim(),
        },
      });

      if (res.data.changeUsername.confirm === true) {
        form.setFieldValue("username", form.getInputProps("username").value);
        notifications.show({
          title: "Username change",
          message: `Your username was succesfully changed to: ${
            form.getInputProps("username").value
          }`,
        });
      }
    } catch (error: any) {
      form.setFieldError("username", error.message);
    }
  }

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Fieldset
      pt={2}
      legend={
        <Text fw={600} size="xl">
          Username
        </Text>
      }
      radius="md"
    >
      <TextInput
        disabled={l}
        label={
          <Text size="sm" c="dimmed">
            The name used to access your account
          </Text>
        }
        {...form.getInputProps("username")}
      />
      <Button loading={l} onClick={handleSubmit} mb={0} mt={15}>
        Save
      </Button>
    </Fieldset>
  );
}
