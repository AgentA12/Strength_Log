import {
  Container,
  Divider,
  Flex,
  createStyles,
} from "@mantine/core";
import { Calendar, TemplateSection } from "../components/homepage/index";

const useStyles = createStyles(() => ({
  container: {
    marginBottom: 50,
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container
      sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          margin: "auto",
        },
      })}
      component="main"
      fluid
      className={classes.container}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={5} >
        <Calendar />

        <Divider orientation="vertical" variant="dotted" />
      </Flex>

      <TemplateSection />
    </Container>
  );
}
