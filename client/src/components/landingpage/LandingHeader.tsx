import { AiFillThunderbolt } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {  Container, Group, Burger, rem } from "@mantine/core";

const HEADER_HEIGHT = rem(60);

// root: {
//   position: "relative",
//   zIndex: 1,
// },

// dropdown: {
//   position: "absolute",
//   top: HEADER_HEIGHT,
//   left: 0,
//   right: 0,
//   zIndex: 0,
//   borderTopRightRadius: 0,
//   borderTopLeftRadius: 0,
//   borderTopWidth: 0,
//   overflow: "hidden",

//   [theme.fn.largerThan("sm")]: {
//     display: "none",
//   },
// },

// header: {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   height: "100%",
// },

// links: {
//   [theme.fn.smallerThan("sm")]: {
//     display: "none",
//   },
// },

// burger: {
//   [theme.fn.largerThan("sm")]: {
//     display: "none",
//   },
// },

// link: {
//   display: "block",
//   lineHeight: 1,
//   padding: `${rem(8)} ${rem(12)}`,
//   borderRadius: theme.radius.sm,
//   textDecoration: "none",
//   color:
//     theme.colorScheme === "dark"
//       ? theme.colors.dark[0]
//       : theme.colors.gray[7],
//   fontSize: theme.fontSizes.sm,
//   fontWeight: 500,

//   "&:hover": {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//   },

//   [theme.fn.smallerThan("sm")]: {
//     borderRadius: 0,
//     padding: theme.spacing.md,
//   },
// },

// linkActive: {
//   "&, &:hover": {
//     backgroundColor: theme.fn.variant({
//       variant: "light",
//       color: theme.primaryColor,
//     }).background,
//     color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
//       .color,
//   },
// },

const links = [
  { link: "#Features", label: "Features" },
  { link: "#Contact", label: "Contact" },
  { link: "#Get-Started", label: "Get Started" },
];

export default function LandingHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <Container>
      <AiFillThunderbolt size={28} />
      <Group spacing={5}>{items}</Group>

      <Burger opened={opened} onClick={toggle} size="sm" />
    </Container>
  );
}
