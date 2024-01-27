import classes from "./css/navbar.module.css";
import auth from "../../utils/auth/auth.js";
import { Flex, Text, Group, ActionIcon, Box } from "@mantine/core";
import { AiOutlineLineChart, AiOutlineTool } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { ToggleTheme } from "./index.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { motion } from "framer-motion";

interface Props {
  toggleMobile: () => void;
}

const linkData = [
  { icon: GoHome, label: "dashboard", link: "/dashboard" },
  { icon: AiOutlineLineChart, label: "progress", link: "/progress" },
  { icon: AiOutlineTool, label: "utilities", link: "/utilities" },
  { icon: CiSettings, label: "settings", link: "/settings" },
];

export default function SideNav({ toggleMobile }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(pathname.replace("/", ""));
  }, [pathname]);

  const [active, setActive] = useState<string>(pathname.replace("/", ""));
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const links = linkData.map((item) => (
    <Box
      component={NavLink}
      to={item.link}
      onMouseEnter={() => setHoveredTab(item.label)}
      className={classes.link}
      key={item.label}
      data-active={item.label === active || null}
      onClick={toggleMobile}
    >
      <Group gap={8} align="center">
        <item.icon size={20} />
        <Text tt="capitalize" span>
          {item.label}
        </Text>
      </Group>
      {item.label === hoveredTab ? (
        <motion.div
          className={classes.hoverAnimation}
          layoutId="hoverAnimation"
          transition={{
            duration: 0.05,
            type: "spring",
            bounce: 0.7,
            mass: 0.5,
          }}
        ></motion.div>
      ) : null}
    </Box>
  ));

  return (
    <Flex h="100%" justify="space-between" direction="column">
      <Group onMouseLeave={() => setHoveredTab(null)} gap={5} justify="left">
        {...links}
      </Group>

      <Group style={{ alignSelf: "center" }}>
        <ToggleTheme />

        <ActionIcon variant="outline" onClick={auth.logout}>
          <HiLogout />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
