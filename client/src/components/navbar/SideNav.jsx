import { Flex, Text, Group, ActionIcon } from "@mantine/core";
import { AiOutlineLineChart, AiOutlineTool } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { ToggleTheme } from "./index.js";
import auth from "../../utils/auth/auth.js";
import classes from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
const linkData = [
  { icon: GoHome, label: "Dashboard", link: "/DashBoard" },
  { icon: AiOutlineLineChart, label: "Progress", link: "/Progress" },
  { icon: AiOutlineTool, label: "Utilities", link: "/Utilities" },
  { icon: CiSettings, label: "Settings", link: "/Settings" },
];

export default function SideNav({ toggleMobile }) {
  const [active, setActive] = useState("Dashboard");
  
  const links = linkData.map((item) => (
    <Text
      variant="subtle"
      component={NavLink}
      to={item.link}
      className={classes.link}
      href={item.link}
      key={item.label}
      data-active={item.label === active || undefined}
      onClick={() => {
        setActive(item.label);
        toggleMobile();
      }}
    >
      <item.icon size={18} stroke={1.5} />
      <Text span>{item.label}</Text>
    </Text>
  ));

  return (
    <Flex h="100%" justify="space-between" direction="column">
      <Group>{...links}</Group>

      <Group style={{ alignSelf: "center" }}>
        <ToggleTheme />

        <ActionIcon variant="outline" label="Logout" onClick={auth.logout}>
          <HiLogout />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
