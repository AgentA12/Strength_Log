import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
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
    <Navbar sx={{ position: "fixed" }} width={{ base: 80 }} p="md">
      <Center>
        <AiFillThunderbolt type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={1}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
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
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
