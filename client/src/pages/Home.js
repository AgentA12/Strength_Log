import {
  Box,
  Container,
  Divider,
  Flex,
  Title,
  createStyles,
} from "@mantine/core";
import {
  Calendar,
  TemplateSection,
  RecentCarousel
} from "../components/homepage/index";

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 50,
  },
  flex: {
    flexDirection: "row",
    [theme.fn.smallerThan("lg")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container component="main" fluid className={classes.container}>
      <Flex className={classes.flex} gap={30}>
        <Calendar />

        <Divider orientation="vertical" variant="dotted" />

        <Box>
          <Title order={2} mb={15}>
            Recently Completed
          </Title>
          <RecentCarousel />
        </Box>
      </Flex>

      <TemplateSection />
    </Container>
  );
}
