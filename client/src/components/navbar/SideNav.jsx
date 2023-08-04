import { Navbar, createStyles, Flex } from "@mantine/core";
import {
  AiFillThunderbolt,
  AiFillHome,
  AiFillSetting,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { ToggleTheme, NavbarLink } from "./index.js";
import auth from "../../utils/auth/auth.js";
import { useLocation } from "react-router-dom";

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
      flexWrap: "wrap",
    },

    [theme.fn.smallerThan("xs")]: {
      justifyContent: "center",
    },
  },

  iconFlex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      display: "none",
    },
  },

  navLinks: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      gap: 20,
    },
    [theme.fn.smallerThan("xs")]: {},
  },

  bottomLinks: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "row",
      gap: 20,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

const linkData = [
  { icon: AiFillHome, label: "Home", link: "/Home" },
  { icon: AiOutlineLineChart, label: "Progress", link: "/Progress" },
  { icon: AiFillSetting, label: "Settings", link: "/Settings" },
];

export default function SideNav() {
  const { pathname } = useLocation();
  const { classes } = useStyles();

  const links = linkData.map((link) => (
    <NavbarLink {...link} key={link.label} active={link.link === pathname} />
  ));
  return (
    <Navbar className={classes.container} p="md">
      <Flex className={classes.linkContainer}>
        <Flex sx={classes.iconFlex}>
          <AiFillThunderbolt size={30} />
        </Flex>

        <Navbar.Section>
          <Flex className={classes.navLinks}>{links}</Flex>
        </Navbar.Section>

        <Navbar.Section className={classes.innerSection}>
          <Flex className={classes.bottomLinks}>
            <ToggleTheme />

            <NavbarLink
              icon={HiLogout}
              label="Logout"
              clickHandler={auth.logout}
            />
          </Flex>
        </Navbar.Section>
      </Flex>
    </Navbar>
  );
}
