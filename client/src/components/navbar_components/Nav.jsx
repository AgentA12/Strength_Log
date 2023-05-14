import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Text,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";
import SettingsNavBtn from "./SettingsBtn";

const HEADER_HEIGHT = "45px";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    marginBottom: 20,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    marginBottom: 20,
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    margin: `10px 12px`,

    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      color: theme.colors.blue[5],
    },
  },

  linkActive: {
    "&, &:hover": {
      color: theme.colors.blue[5],
    },
  },
}));

const links = [
  {
    link: "/Templates",
    name: "Templates",
  },
  {
    link: "/Progress",
    name: "Progress",
  },
  {
    link: "/Workouts",
    name: "Workouts",
  },
  {
    componentName: SettingsNavBtn,
    name: "Settings",
  },
];

export function Nav() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].name);
  const { classes, cx } = useStyles();

  const items = links.map((link) =>
    link.name === "Settings" ? (
      <link.componentName key={link.name} />
    ) : (
      <Link
        key={link.name}
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.name,
        })}
        onClick={() => {
          setActive(link.name);
        }}
      >
        {link.name}
      </Link>
    )
  );

  return (
    <Header height={HEADER_HEIGHT} py={30} className={classes.root}>
      <Container className={classes.header}>
        <Flex align="center">
          <AiOutlineThunderbolt size={32} />
          <Text italic color="blue" fw={900}>
            Strength Log
          </Text>
        </Flex>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
