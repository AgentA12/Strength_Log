import {
  Menu,
  Button,
  useMantineColorScheme,
  Modal,
  Text,
  TextInput,
  Flex,
} from "@mantine/core";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiMineExplosion } from "react-icons/gi";
import { BsMoon, BsSun } from "react-icons/bs";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { Navigate } from "react-router-dom";

export default function SettingsNavBtn() {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [removeAccount, { data, loading }] = useMutation(DELETE_ACCOUNT);

  //getting user info
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  function handleChange({ target }) {
    if (target.value === "I confirm that I am about to delete my account") {
      setDeleteAllowed(true);
    } else {
      setDeleteAllowed(false);
    }
  }

  function handleDelete() {
    removeAccount({
      variables: {
        userID: userID,
      },
    });
  }

  if (data?.deleteAccount?.confirm === true) {
    auth.logout("/");
    return <Navigate to="/login" replace />;
  }

  const dark = colorScheme === "dark";

  return (
    <Menu shadow="md" width={230} position="bottom-right" trigger="hover">
      <Menu.Target>
        <Button
          rightIcon={<IoMdArrowDropdown size={15} />}
          variant="subtle"
          compact
        >
          Account
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => toggleColorScheme()}
          icon={dark ? <BsSun size={14} /> : <BsMoon size={14} />}
        >
          Change Theme
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          icon={<GiMineExplosion />}
          onClick={() => setOpened(!opened)}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>

      <Modal
        onClose={() => [setDeleteAllowed(false), setOpened(false)]}
        title="Delete Account"
        opened={opened}
        size={"lg"}
      >
        <Text stylee={{ marginBottom: 4 }}>
          Are you sure you want to delete your account? Deleting your account is
          permanent and will delete all your templates and progress forever.
        </Text>
        <Text>
          Type
          <Text fw={900} component="span" style={{ margin: 5 }}>
            I confirm that I am about to delete my account
          </Text>
          to confirm
        </Text>

        <TextInput
          style={{ marginBottom: 10, marginTop: 10 }}
          onChange={handleChange}
        ></TextInput>

        <Flex justify="end" gap={10}>
          <Button color={"gray"} onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color={"red"}
            disabled={!deleteAllowed}
            style={{ "&[disabled]": { pointerEvents: "all" } }}
            onClick={handleDelete}
            loading={loading}
          >
            Yes remove my account
          </Button>
        </Flex>
      </Modal>
    </Menu>
  );
}
