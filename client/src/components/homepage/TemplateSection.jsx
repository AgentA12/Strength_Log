import { useEffect, useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TemplateCard } from "./index";
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
  Grid,
  Group,
} from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { UserContext } from "../../app";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";

export default function TemplateSection() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const [templates, setTemplates] = useState([]);

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
        <>
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
          <Skeleton width={"auto"} height={120} />{" "}
        </>
      );
    // does the array of templates have length? display the template cards
    if (templates.length)
      return templates.map((template) => (
        <Grid.Col>
          <TemplateCard
            template={template}
            refetch={refetch}
            handleTemplateDelete={handleTemplateDelete}
            key={template._id}
          />
        </Grid.Col>
      ));
    return <Text size={"xl"}>You have no templates saved.</Text>;
  }

  return (
    <Box component="section">
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

        <Button component={Link} to="/Create-template">
          Create new Template
        </Button>
      </Flex>

      {error ? (
        <Center>
          <Text color="red" size="lg" fw={500}>
            {error.message}
          </Text>
        </Center>
      ) : (
        <Box
          gutter="sm"
          grow
          style={{
            width: "100%",
            flexGrow: true,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {displayQueryState()}
        </Box>
      )}
    </Box>
  );
}
