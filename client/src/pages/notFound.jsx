import { Link } from "react-router-dom";
import { Title, Text, Button, Container, Group, Box } from "@mantine/core";
import classes from "./notFound.module.scss";

export default function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <Box className={classes.label}>404</Box>
      <Text className={classes.label}>¯\_(ツ)_/¯</Text>
      <Title>You have found a secret place.</Title>
      <Text color="dimmed" size="lg" align="center">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, the page has been removed or moved to another URL.
      </Text>
      <Group align="center" justify="center">
        <Button variant="subtle" size="md" component={Link} to="/DashBoard">
          Take me home
        </Button>
      </Group>
    </Container>
  );
}
