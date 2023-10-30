import { Container, createStyles } from "@mantine/core";
import { Calendar, TemplateSection, } from "../components/homepage/index";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
    [theme.fn.smallerThan("sm")]: {
      margin: "auto",
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <Calendar />
     
      <TemplateSection />
    </Container>
  );
}
