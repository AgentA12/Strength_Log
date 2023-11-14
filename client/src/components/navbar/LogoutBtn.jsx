import React from "react";
import auth from "../../utils/auth/auth";
import { Text } from "@mantine/core";
import classes from "./navbar.module.scss";

export default function LogoutBtn() {
  return (
    <Text className={classes.link} onClick={() => auth.logout()}>
      Logout
    </Text>
  );
}
