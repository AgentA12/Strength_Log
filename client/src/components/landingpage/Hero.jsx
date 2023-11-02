import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
} from "@mantine/core";
import { Dots } from "./index";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: "relative",
        marginBottom: 350,
        paddingBottom: rem(80),
        [theme.fn.smallerThan("sm")]: {
          paddingBottom: rem(60),
        },
      },
    
      inner: {
        position: "relative",
        zIndex: 1,
      },
    
      dots: {
        position: "absolute",
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
    
        [theme.fn.smallerThan("sm")]: {
          display: "none",
        },
      },
    
      dotsLeft: {
        left: 0,
        top: 0,
      },
    
      title: {
        textAlign: "center",
        fontWeight: 800,
        fontSize: rem(75),
        letterSpacing: -1,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    
        [theme.fn.smallerThan("xs")]: {
          fontSize: rem(28),
          textAlign: "left",
        },
      },
    
      maintitle: {
        textAlign: "center",
        fontWeight: 800,
        fontSize: rem(75),
        letterSpacing: -1,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        [theme.fn.smallerThan("xs")]: {
          fontSize: rem(28),
          textAlign: "left",
        },
      },
    
      highlight: {
        color:
          theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
      },
    
      description: {
        textAlign: "center",
        [theme.fn.smallerThan("xs")]: {
          textAlign: "left",
          fontSize: theme.fontSizes.md,
        },
      },
    
      controls: {
        marginTop: theme.spacing.lg,
        display: "flex",
        justifyContent: "center",
    
        [theme.fn.smallerThan("xs")]: {
          flexDirection: "column",
        },
      },
    
      control: {
        "&:not(:first-of-type)": {
          marginLeft: theme.spacing.md,
        },
    
        [theme.fn.smallerThan("xs")]: {
          height: rem(42),
          fontSize: theme.fontSizes.md,
    
          "&:not(:first-of-type)": {
            marginTop: theme.spacing.md,
            marginLeft: 0,
          },
        },
      },
    
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        marginBottom: 0,
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
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
    
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      },
    
      linkActive: {
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


export default function Hero() {
  const {classes} = useStyles();
  return (
    <Container mt={50} className={classes.wrapper} size={1400}>
    
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 70 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 80 }} />
      <Dots className={classes.dots} style={{ right: 60, top: 250 }} />
      <Dots className={classes.dots} style={{ left: 350, top: 500 }} />
      <Dots className={classes.dots} style={{ right: 390, top: -25 }} />

      <div className={classes.inner}>
        <Text className={[classes.title, classes.highlight]} italic>
          Strength Log
        </Text>
        <Title className={classes.title}>
          Less Writing. More{" "}
          <Text component="span" className={classes.highlight} inherit>
            Lifting.
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="xl" color="dimmed" className={classes.description}>
            Strength Log is the simplest, most intuitive workout tracking
            experience. Take your training to the next level.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            component={Link}
            to="/login"
          >
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  );
}
