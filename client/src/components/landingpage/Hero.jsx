import { Title, Text, Button, Container, } from "@mantine/core";
import { Dots } from "./index";
import { Link } from "react-router-dom";

// wrapper: {
//     position: "relative",
//     marginBottom: 350,
//     paddingBottom: rem(80),
//     [theme.fn.smallerThan("sm")]: {
//       paddingBottom: rem(60),
//     },
//   },

//   inner: {
//     position: "relative",
//     zIndex: 1,
//   },

//   dots: {
//     position: "absolute",
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[5]
//         : theme.colors.gray[1],

//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },

//   dotsLeft: {
//     left: 0,
//     top: 0,
//   },

//   title: {
//     textAlign: "center",
//     fontWeight: 800,
//     fontSize: rem(75),
//     letterSpacing: -1,
//     color: theme.colorScheme === "dark" ? theme.white : theme.black,
//     marginBottom: theme.spacing.xs,
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,

//     [theme.fn.smallerThan("xs")]: {
//       fontSize: rem(28),
//       textAlign: "left",
//     },
//   },

//   maintitle: {
//     textAlign: "center",
//     fontWeight: 800,
//     fontSize: rem(75),
//     letterSpacing: -1,
//     marginBottom: theme.spacing.xs,
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     [theme.fn.smallerThan("xs")]: {
//       fontSize: rem(28),
//       textAlign: "left",
//     },
//   },

//   highlight: {
//     color:
//       theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
//   },

//   description: {
//     textAlign: "center",
//     [theme.fn.smallerThan("xs")]: {
//       textAlign: "left",
//       fontSize: theme.fontSizes.md,
//     },
//   },

//   controls: {
//     marginTop: theme.spacing.lg,
//     display: "flex",
//     justifyContent: "center",

//     [theme.fn.smallerThan("xs")]: {
//       flexDirection: "column",
//     },
//   },

//   control: {
//     "&:not(:first-of-type)": {
//       marginLeft: theme.spacing.md,
//     },

//     [theme.fn.smallerThan("xs")]: {
//       height: rem(42),
//       fontSize: theme.fontSizes.md,

//       "&:not(:first-of-type)": {
//         marginTop: theme.spacing.md,
//         marginLeft: 0,
//       },
//     },
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "100%",
//     marginBottom: 0,
//   },

//   links: {
//     [theme.fn.smallerThan("xs")]: {
//       display: "none",
//     },
//   },

//   burger: {
//     [theme.fn.largerThan("xs")]: {
//       display: "none",
//     },
//   },

//   link: {
//     display: "block",
//     lineHeight: 1,
//     padding: `${rem(8)} ${rem(12)}`,
//     borderRadius: theme.radius.sm,
//     textDecoration: "none",
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[0]
//         : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     },
//   },

//   linkActive: {
//     "&, &:hover": {
//       backgroundColor: theme.fn.variant({
//         variant: "light",
//         color: theme.primaryColor,
//       }).background,
//       color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
//         .color,
//     },
//   },

export default function Hero() {
  return (
    <Container mt={50} size={1400}>
      <Dots style={{ left: 60, top: 0 }} />
      <Dots style={{ left: 0, top: 140 }} />
      <Dots style={{ right: 0, top: 60 }} />
      <Dots style={{ right: 0, top: 70 }} />
      <Dots style={{ right: 0, top: 80 }} />
      <Dots style={{ right: 60, top: 250 }} />
      <Dots style={{ left: 350, top: 500 }} />
      <Dots style={{ right: 390, top: -25 }} />

      <div>
        <Text  italic>
          Strength Log
        </Text>
        <Title>
          Less Writing. More{" "}
          <Text component="span" inherit>
            Lifting.
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="xl" color="dimmed">
            Strength Log is the simplest, most intuitive workout tracking
            experience. Take your training to the next level.
          </Text>
        </Container>

        <div>
          <Button size="lg" component={Link} to="/login">
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  );
}
