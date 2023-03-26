import React from "react";
import auth from "../../utils/auth/auth";
import { Text } from "@mantine/core";

export default function LogoutBtn({ setIsOpen, isOpen }) {
  return (
    <Text onClick={() => [auth.logout(), setIsOpen(!isOpen)]}>Logout</Text>
  );
}
