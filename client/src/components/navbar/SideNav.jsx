import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Flex,
} from "@mantine/core";
import {
  AiFillThunderbolt,
  AiFillHome,
  AiFillSetting,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { IoMdSwap } from "react-icons/io";
import { ToggleTheme } from "./index.js";
import { Link } from "react-router-dom";
import auth from "../../utils/auth/auth.js";

const useStyles = createStyles((theme) => ({
  container: {
    position: "fixed",
    width: 80,
    [theme.fn.smallerThan("sm")]: {
      right: 0,
      bottom: 0,
      height: "auto",
      width: "100%",
      borderTopStyle: "solid",
      borderTopWidth: 1,
      borderTopColor: "gray",
    },

  },

  linkContainer: {
    direction: "column",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap"
    },
  },

  flexItems: {
    direction: "column",
    justify: "center",
    align: "center",
  },

  link: {
    width: 45,
    height: 45,
    marginTop: 5,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick, link }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        component={Link}
        to={link ? link : ""}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: AiFillHome, label: "Home", link: "/Home" },
  { icon: AiOutlineLineChart, label: "Progress", link: "/Progress" },
  { icon: AiFillSetting, label: "Settings", link: "/Settings" },
];

export default function SideNav() {
  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar className={classes.container} p="md">
      <Flex className={classes.linkContainer}>
        <Flex
          sx={(theme) => ({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            [theme.fn.smallerThan("sm")]: {
              flexDirection: "row",
              display: "none",
            },
          })}
        >
          <AiFillThunderbolt size={30} />
        </Flex>

        <Navbar.Section>
          <Flex
            sx={(theme) => ({
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              [theme.fn.smallerThan("sm")]: {
                flexDirection: "row",
                gap: 20,
              },
            })}
          >
            {links}
          </Flex>
        </Navbar.Section>

        <Navbar.Section className={classes.innerSection}>
          <Flex
            sx={(theme) => ({
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              [theme.fn.smallerThan("sm")]: {
                flexDirection: "row",
                gap: 20,
              },
            })}
          >
            <ToggleTheme />

            <NavbarLink
              icon={IoMdSwap}
              label="Change account"
              onClick={() => auth.logout("/login")}
            />
            <NavbarLink
              icon={HiLogout}
              label="Logout"
              onClick={() => auth.logout()}
            />
          </Flex>
        </Navbar.Section>
      </Flex>
    </Navbar>
  );
}
