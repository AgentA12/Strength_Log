import { useEffect, useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TemplateCard, StartWorkoutModal } from "./index";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import {
  Box,
  Title,
  Text,
  Flex,
  Center,
  TextInput,
  Button,
  Skeleton,
  Group,
} from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { UserContext } from "../../app";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function TemplateSection() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const [templates, setTemplates] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  const { loading, data, error, refetch } = useQuery(GET_TEMPLATES, {
    fetchPolicy: "network-only", // Used for first execution
    variables: {
      userId: _id,
    },
  });

  useEffect(() => {
    if (data) setTemplates(data.getTemplates);
  }, [data]);

  async function handleTemplateDelete(templateId) {
    try {
      const res = await deleteTemplate({
        variables: {
          templateId: templateId,
        },
      });
      refetch();
      showNotification({
        title: `Template was deleted.`,
        message: (
          <>
            <Text span size="md" weight="bold">
              {res.data.deleteTemplate.templateName}
            </Text>{" "}
            was successfully deleted.
          </>
        ),
        autoClose: 3000,
      });
    } catch (error) {
      showNotification({
        title: "Error, unable to delete template.",
        message: error.message,
        autoClose: 3000,
        color: "red",
      });
    }
  }

  function filterTemplates(event) {
    event.preventDefault();

    const newTemplates = templates.filter((template) => {
      return template.templateName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    if (newTemplates.length > 0) {
      setTemplates(newTemplates);
    }

    if (event.target.value.trim().length === 0) {
      setTemplates(data.getTemplates);
    }
  }

  function displayQueryState() {
    if (loading)
      return (
        <>
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
        </>
      );

    if (templates.length)
      return templates.map((template, i) => (
        <div key={template._id}>
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          >
            <TemplateCard
              template={template}
              refetch={refetch}
              handleTemplateDelete={handleTemplateDelete}
              key={template._id}
            />
          </div>
        </div>
      ));
    return <Text size="xl">You have no templates saved.</Text>;
  }

  return (
    <Box component="section" mb={100}>
      <StartWorkoutModal
        opened={opened}
        close={close}
        loading={loading}
        templates={templates}
      />
      <Flex
        gap="lg"
        justify={{ base: "center", lg: "flex-start" }}
        align="center"
        wrap="wrap"
        mb={20}
      >
        <Title order={2} tt="capitalize" align="center">
          Your Templates
        </Title>
        <TextInput
          style={{ flexGrow: 1 }}
          onChange={(event) => filterTemplates(event, templates)}
          placeholder="Search templates..."
          leftSection={<AiOutlineSearch size={20} />}
        />
        <Group justify="center">
          <Button onClick={open}>Start a workout</Button>
          <Button component={Link} to="/Create-template">
            Create new Template
          </Button>
        </Group>
      </Flex>

      {error ? (
        <Center>
          <Text size="lg" fw={500}>
            {error.message}
          </Text>
        </Center>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {displayQueryState()}
        </div>
      )}
    </Box>
  );
}
