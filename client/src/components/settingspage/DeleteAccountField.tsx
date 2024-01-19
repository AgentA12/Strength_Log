import {
  Button,
  TextInput,
  Box,
  Text,
  Fieldset,
  Divider,
  Modal,
} from "@mantine/core";
import { useContext } from "react";
import { UserContext, UserInfo } from "../../contexts/userInfo";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import auth from "../../utils/auth/auth";

export default function DeleteAccountField() {
  const userInfo = useContext<UserInfo>(UserContext);
  const userID = userInfo?.data._id;

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const [deleteAccount] = useMutation(DELETE_ACCOUNT);

  const form = useForm({
    initialValues: {
      confirmDeletion: "",
    },
    validate: {
      confirmDeletion: (val: string) =>
        val != "Yes I want to delete my account forever",
    },
  });

  async function handleDelete() {
    try {
      const res = await deleteAccount({ variables: { userID: userID } });

      if (res.data.deleteAccount.confirm === true) {
        auth.logout();
        navigate(0);
      }
    } catch (error) {}
  }

  return (
    <Fieldset radius="md" p={0}>
      <Box p={10}>
        <Text size="xl">Delete Account</Text>

        <Text c="dimmed" size="sm">
          Permanently remove your Personal Account and all of its contents. This
          action is not reversible.
        </Text>
      </Box>

      <Divider mt={5} />

      <Box p={10}>
        <Button onClick={open} mt={5} color="red">
          Remove your account
        </Button>
      </Box>

      <Modal
        title={
          <Text size="xl" fw={400}>
            Delete Account
          </Text>
        }
        opened={opened}
        onClose={close}
      >
        <Text>This action is irreversable.</Text>
        <TextInput
          {...form.getInputProps("confirmDeletion")}
          description={
            <Text span>
              Type{" "}
              <Text span fw={700}>
                Yes I want to delete my account forever
              </Text>
            </Text>
          }
        />
        <Button
          disabled={
            form.values.confirmDeletion !=
            "Yes I want to delete my account forever"
          }
          onClick={handleDelete}
          mt={10}
          color="red.6"
        >
          Permanently remove account
        </Button>
      </Modal>
    </Fieldset>
  );
}
