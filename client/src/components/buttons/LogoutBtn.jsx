import React from "react";
import auth from "../../utils/auth/auth";
import { Button } from "@mantine/core";

export default function LogoutBtn({ setIsOpen, isOpen }) {
  return (
    <Button
      variant="outline"
      color={"grape"}
      onClick={() => [auth.logout(), setIsOpen(!isOpen)]}
    >
      logout
    </Button>
  );
}
