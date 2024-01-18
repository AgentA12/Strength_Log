import { Box, Stack, Divider, Title, Container } from "@mantine/core";
import {
  DeleteAccountField,
  UsernameField,
  PasswordField,
  PrefferedColorField,
} from "../components/settingspage";

export default function SettingsPage() {
  return (
    <Container fluid>
      <Divider label={<Title>Settings</Title>} />
      <Box style={{ maxWidth: "700px" }}>
        <Stack m={5}>
          <UsernameField />
          <PasswordField />
          <PrefferedColorField />
          <DeleteAccountField />
        </Stack>
      </Box>
    </Container>
  );
}
