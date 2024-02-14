import classes from "./css/navbar.module.css";
import { Flex, Text, Group, Box } from "@mantine/core";
import { AiOutlineLineChart, AiOutlineTool } from "react-icons/ai";
import { AccountLink } from "./index.js";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { motion } from "framer-motion";
import { IconBowl } from "@tabler/icons-react";

interface Props {
  toggleMobile: () => void;
  direction?: "row" | "column";
  align?: string;
}

const linkData = [
  { icon: GoHome, label: "dashboard", link: "/dashboard" },
  { icon: AiOutlineLineChart, label: "progress", link: "/progress" },
  { icon: AiOutlineTool, label: "utilities", link: "/utilities" },
  { icon: IconBowl, label: "foodstuffs", link: "/foodstuffs" },
];

export default function SideNav({
  toggleMobile,
  direction,
  align = "center",
}: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(pathname.replace("/", ""));
  }, [pathname]);

  const [active, setActive] = useState<string>(pathname.replace("/", ""));
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const links = linkData.map((item) => (
    <Box
      p={8}
      component={NavLink}
      to={item.link}
      onMouseEnter={() => setHoveredTab(item.label)}
      className={classes.link}
      key={item.label}
      data-active={item.label === active || null}
      onClick={toggleMobile}
    >
      <Group gap={4} wrap="nowrap" align="center" justify="center">
        <Text tt="capitalize" size="sm" span>
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
    <Flex
      h="100%"
      align={align}
      justify="space-between"
      gap={20}
      direction={direction}
    >
      <Flex
        w="100%"
        onMouseLeave={() => setHoveredTab(null)}
        direction={direction}
        gap={12}
        justify="center"
        align="center"
      >
        {...links}
        <AccountLink />
      </Flex>
    </Flex>
  );
}
