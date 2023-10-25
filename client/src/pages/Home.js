import { Container, Divider, Flex, createStyles } from "@mantine/core";
import { Calendar, TemplateSection } from "../components/homepage/index";

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 50,
    [theme.fn.smallerThan("sm")]: {
      margin: "auto",
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container  fluid className={classes.container}>
      <Flex align="center" direction={{ base: "column", md: "row" }} gap={10}>
        <Calendar />

        <Divider orientation="vertical" variant="dotted" />
      </Flex>

      <TemplateSection />
    </Container>
  );
}
