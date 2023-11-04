import {
  Container,
  Button,
  TextInput,
  Divider,
  Title,
  Tabs,
  Box,
  createStyles,
  Card,
  Text,
  Stack,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inputGroup: {
    border: "1px solid",
    borderColor: theme.colors.dark[7],
    borderRadius: "0.5em",
    padding: 10,
  },
}));

export default function SettingsPage() {
  const { classes } = useStyles();
  return (
    <Container fluid>
      <Divider
        my="xl"
        variant="dashed"
        label={<Title>Account Settings</Title>}
      />
      <Container fluid>
        <Tabs
          orientation="vertical"
          defaultValue="general"
          variant="pills"
          color="white"
          m={50}
        >
          <Tabs.List>
            <Tabs.Tab value="general">General</Tabs.Tab>
            <Tabs.Tab value="progress">Progress</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel mx={30} my={15} value="general" pl="lg">
            <Stack>
              <Card withBorder>
                <Box>
                  <TextInput
                    size="md"
                    label={
                      <Text fz={25} fw={500}>
                        Username
                      </Text>
                    }
                    description="This is the name that will be displayed and used to login to your account"
                  />
                </Box>
              </Card>

              <Card withBorder>
                <Box>
                  <TextInput
                    size="md"
                    label={
                      <Text fz={25} fw={500}>
                        Password
                      </Text>
                    }
                    description="Your password for this account"
                  />
                </Box>
              </Card>

              <Card withBorder>
                <Box>
                  <Text fz={25} fw={500}>
                    Delete Account
                  </Text>
                  <Text c="dimmed" size="sm">
                    Permanently remove your Personal Account and all of its
                    contents. This action is not reversible.
                  </Text>

                  <Button mt={5} color="red">
                    Delete Account
                  </Button>
                </Box>
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="progress" pl="lg">
            <Box m={30}></Box>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Container>
  );
}
