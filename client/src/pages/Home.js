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
  RecentCarousel,
} from "../components/homepage/index";

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
      <Flex direction={{ base: "column", md: "row" }} gap={30}>

        <Calendar />

        <Divider orientation="vertical" variant="dotted" />

        <Box >
          <Title
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: {
                textAlign: "center",
              },
            })}
            order={2}
            mb={15}
          >
            Recently Completed
          </Title>
          <RecentCarousel />
        </Box>
      </Flex>

      <TemplateSection />
    </Container>
  );
}
