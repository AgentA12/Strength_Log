import { useEffect, useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SearchTemplates, TemplateCard, AddTemplateBtn } from "./index";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import {
  Box,
  Title,
  Text,
  Divider,
  Flex,
  Loader,
  Center,
  Group,
} from "@mantine/core";
import { UserContext } from "../../App";
import { showNotification } from "@mantine/notifications";

export default function TemplateSection() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const [templates, setTemplates] = useState([]);

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  const { loading, data, error, refetch } = useQuery(GET_TEMPLATES, {
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
            <Text span={true} size="md" weight="bold">
              {res.data.deleteTemplate.templateName}
            </Text>{" "}
            was successfully deleted
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
    // is the query loading?
    if (loading)
      return (
        <Flex direction="column" align="center">
          <Loader />
          <Text>Loading...</Text>
        </Flex>
      );
    // does the array of templates have length? display the template cards
    if (templates.length)
      return templates.map((template) => (
        <TemplateCard
          template={template}
          refetch={refetch}
          handleTemplateDelete={handleTemplateDelete}
          key={template._id}
        />
      ));
    return <Text size={"xl"}>You have no templates saved yet.</Text>;
  }

  return (
    <Box component="section">
      <Flex
        gap="lg"
        justify={{ base: "center", sm: "flex-start" }}
        align="center"
        direction="row"
        wrap="wrap"
        mt={20}
      >
        <Title tt="capitalize">Your Templates</Title>

        <Flex
          gap="lg"
          justify={{ base: "center", sm: "flex-start" }}
          align="center"
          direction="row"
          wrap="wrap"
        >
          <SearchTemplates
            templates={templates}
            filterTemplates={filterTemplates}
          />
          <Group>
            <AddTemplateBtn />
          </Group>
        </Flex>
      </Flex>

      <Divider my="md" variant="dashed" />

      {error ? (
        <Center>
          <Text color="red" size="lg" fw={500}>
            {error.message}
          </Text>
        </Center>
      ) : (
        <Flex
          wrap={"wrap"}
          justify={{ base: "center", sm: "flex-start" }}
          gap="md"
        >
          {displayQueryState()}
        </Flex>
      )}
    </Box>
  );
}
