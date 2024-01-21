import classes from "./navbar.module.css";
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
  { icon: GoHome, label: "Dashboard", link: "/Dashboard" },
  { icon: AiOutlineLineChart, label: "Progress", link: "/Progress" },
  { icon: AiOutlineTool, label: "Utilities", link: "/Utilities" },
  { icon: CiSettings, label: "Settings", link: "/Settings" },
];

export default function SideNav({ toggleMobile }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.replace("/", ""));
  }, [pathname]);

  const [active, setActive] = useState(pathname.replace("/", ""));
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  function handleLogout() {
    auth.logout();
    navigate(0);
  }

  const links = linkData.map((item) => (
    <Box
      component={NavLink}
      to={item.link}
      onMouseEnter={() => setHoveredTab(item.label)}
      className={classes.link}
      key={item.label}
      data-active={item.label === active || undefined}
      onClick={toggleMobile}
    >
      <Group gap={8} align="center">
        <item.icon size={20} />
        <Text span>{item.label}</Text>
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

        <ActionIcon variant="outline" onClick={handleLogout}>
          <HiLogout />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
