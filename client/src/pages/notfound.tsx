import { Link } from "react-router-dom";
import { Title, Text, Button, Container, Group, Box } from "@mantine/core";
import classes from "./css/notfound.module.css";

export default function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <Title className={classes.label}>404 Error</Title>
      <Text className={classes.label}>¯\_(ツ)_/¯</Text>
      <Title order={2}>You have found a secret place.</Title>
      <Text c="dimmed" size="md" ta="center" mt={5}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, the page has been removed or moved to another URL.
      </Text>
      <Group align="center" justify="center">
        <Button
          variant="subtle"
          size="md"
          mt={5}
          style={{ textDecoration: "underline" }}
          component={Link}
          to="/Dashboard"
        >
          Take me home
        </Button>
      </Group>
    </Container>
  );
}
