import {
  Container,
  Button,
  TextInput,
  Box,
  Card,
  Text,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { useQuery, gql } from "@apollo/client";
import { UserContext } from "../app";
import { useContext } from "react";

const GET_USER_SETTINGS = gql`
  query ($userID: ID!) {
    getUserSettings(userID: $userID) {
      username
    }
  }
`;

export default function SettingsPage() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const { data } = useQuery(GET_USER_SETTINGS, {
    variables: {
      userID: _id,
    },
  });

  return (
    <Container fluid>
      <Stack>
        <Card withBorder>
          <Box>
            <TextInput
              size="md"
              defaultValue={data?.getUserSettings.username}
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
            <PasswordInput
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
              Permanently remove your Personal Account and all of its contents.
              This action is not reversible.
            </Text>

            <Button mt={5} color="red">
              Delete Account
            </Button>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
