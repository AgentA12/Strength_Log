import {
  Menu,
  Button,
  useMantineColorScheme,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiMineExplosion } from "react-icons/gi";
// import { FiSettings } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { Navigate } from "react-router-dom";

export default function SettingsNavBtn() {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [removeAccount, { data, loading, error }] = useMutation(DELETE_ACCOUNT);

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
    auth.logout();
    return <Navigate to="/" replace />;
  }

  const dark = colorScheme === "dark";

  return (
    <Menu shadow="md" width={200} position="bottom-end" trigger="hover">
      <Menu.Target>
        <Button
          rightIcon={<IoMdArrowDropdown size={20} />}
          variant="subtle"
          color={"grape"}
        >
          Account
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        {/* <Menu.Item icon={<FiSettings size={14} />}>Settings</Menu.Item> */}
        <Menu.Item
          onClick={() => toggleColorScheme()}
          icon={dark ? <BsSun size={14} /> : <BsMoon size={14} />}
        >
          Change Theme
        </Menu.Item>

        <Menu.Item icon={<FiLogOut />}>
          <LogoutBtn />
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
        className="text-2xl font-semibold"
        opened={opened}
        size={"lg"}
      >
        <Text className="text-base font-light mb-2">
          Are you sure you want to delete your account? Deleting your account is
          permanent and will delete all your templates and progress forever.
        </Text>
        <Text className="text-base font-light">
          Type
          <Text className="font-black inline mx-1">
            I confirm that I am about to delete my account
          </Text>
          to confirm
        </Text>

        <div className="my-3">
          <TextInput onChange={handleChange}></TextInput>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            color={"gray"}
            variant="outline"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>{" "}
          <Button
            color={"red"}
            variant="outline"
            disabled={!deleteAllowed}
            sx={{ "&[disabled]": { pointerEvents: "all" } }}
            onClick={handleDelete}
            loading={loading}
          >
            Yes remove my account
          </Button>
        </div>
      </Modal>
    </Menu>
  );
}
