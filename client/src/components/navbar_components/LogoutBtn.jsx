import React from "react";
import auth from "../../utils/auth/auth";
import { Text } from "@mantine/core";

export default function LogoutBtn() {
  return <Text onClick={() => auth.logout()}>Logout</Text>;
}
