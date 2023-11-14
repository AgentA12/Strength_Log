import { Flex, Text, Group, ActionIcon } from "@mantine/core";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineLineChart,
  AiOutlineTool,
} from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { ToggleTheme } from "./index.js";
import auth from "../../utils/auth/auth.js";
import classes from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const linkData = [
  { icon: AiFillHome, label: "Dashboard", link: "/DashBoard" },
  { icon: AiOutlineLineChart, label: "Progress", link: "/Progress" },
  { icon: AiOutlineTool, label: "Utilities", link: "/Utilities" },
  { icon: AiFillSetting, label: "Settings", link: "/Settings" },
];

export default function SideNav({ toggleMobile }) {
  const [active, setActive] = useState("Dashboard");
  const links = linkData.map((item) => (
    <Text
      component={Link}
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
      <item.icon  size={18} stroke={1.5} />
      <Text span>{item.label}</Text>
    </Text>
  ));

  return (
    <Flex h="100%" justify="space-between" direction="column">
      <Group>{...links}</Group>

      <Group style={{ alignSelf: "center" }}>
        <ToggleTheme />

        <ActionIcon variant="outline" label="Logout" clickHandler={auth.logout}>
          <HiLogout />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
