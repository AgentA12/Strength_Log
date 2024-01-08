import {
  Button,
  TextInput,
  Box,
  Text,
  Stack,
  Fieldset,
  Divider,
  Title,
  PasswordInput,
  Container,
  Modal,
  Select,
} from "@mantine/core";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { UserContext } from "../contexts/userInfo";
import { useEffect, useState, useContext } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { DELETE_ACCOUNT } from "../utils/graphql/mutations";
import auth from "../utils/auth/auth";

const colors = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

export default function SettingsPage() {
  const color = localStorage.getItem("preferredColor");
  return (
    <Container fluid>
      <Divider label={<Title>Settings</Title>} />
      <Box style={{ maxWidth: "700px" }}>
        <Stack m={5}>
          <FieldUsername />
          <FieldPassword />
          <Fieldset
            pt={5}
            legend={
              <Text fw={600} size="xl">
                Preferred Color
              </Text>
            }
            radius="md"
          >
            <Select
              onChange={(val) => {
                localStorage.setItem("preferredColor", val ? val : "teal");
                window.location.reload();
              }}
              defaultValue={color}
              data={colors}
              description="Choose your preferred color"
            />
          </Fieldset>
          <FieldDeleteAccount />
        </Stack>
      </Box>
    </Container>
  );
}

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

function FieldUsername() {
  const { data } = useContext<any>(UserContext);

  const [changeUsername, { loading: l, error: e }] =
    useMutation(CHANGE_USERNAME);

  const {
    data: userSettings,
    loading,
    error,
  } = useQuery(GET_USER_SETTINGS, {
    variables: {
      userID: data._id,
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
          userID: data._id,
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

function FieldPassword() {
  const { data } = useContext<any>(UserContext);

  const [password, setPassword] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);

  const [checkPassword] = useLazyQuery(IS_CORRECT_PASS);
  const [changePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  async function handleChange(e: React.SyntheticEvent) {
    e.preventDefault();

    setPasswordOld(e.target.value);

    const res = await checkPassword({
      variables: {
        userID: data._id,
        password: e.target.value,
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
        userID: data._id,
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
            Enter your new password
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
    </Fieldset>
  );
}

function FieldDeleteAccount() {
  const { data } = useContext<any>(UserContext);
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteAccount, { error, loading }] = useMutation(DELETE_ACCOUNT);

  const form = useForm({
    initialValues: {
      confirmDeletion: "",
    },
    validate: {
      confirmDeletion: (val: string) =>
        val != "Yes I want to delete my account forever",
    },
  });

  async function handleDelete() {
    try {
      const res = await deleteAccount({ variables: { userID: data._id } });

      if (res.data.deleteAccount.confirm === true) {
        auth.logout("/");
      }
    } catch (error) {
    }
  }

  return (
    <Fieldset radius="md" p={0}>
      <Box p={10}>
        <Text size="xl">Delete Account</Text>

        <Text c="dimmed" size="sm">
          Permanently remove your Personal Account and all of its contents. This
          action is not reversible.
        </Text>
      </Box>

      <Divider mt={5} />

      <Box p={10}>
        <Button onClick={open} mt={5} color="red">
          Remove your account
        </Button>
      </Box>

      <Modal
        title={
          <Text size="xl" fw={400}>
            Delete Account
          </Text>
        }
        opened={opened}
        onClose={close}
      >
        <Text>This action is irreversable.</Text>
        <TextInput
          {...form.getInputProps("confirmDeletion")}
          description={
            <Text span>
              Type{" "}
              <Text span fw={700}>
                Yes I want to delete my account forever
              </Text>
            </Text>
          }
        />
        <Button
          disabled={
            form.values.confirmDeletion !=
            "Yes I want to delete my account forever"
          }
          onClick={handleDelete}
          mt={10}
          color="red.6"
        >
          Delete account
        </Button>
      </Modal>
    </Fieldset>
  );
}
