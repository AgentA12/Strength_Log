import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { StartWorkoutModal, SearchTemplates } from "./index";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Box, Title, Text, Flex, Center, Button, Group } from "@mantine/core";
import { useUserInfo } from "../../contexts/userInfo";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { TemplateList } from "./index";

export default function TemplateSection() {
  const userInfo = useUserInfo();
  const userID = userInfo?.data._id;

  const { loading, data, error, refetch } = useQuery(GET_TEMPLATES, {
    fetchPolicy: "network-only",
    variables: {
      userId: userID,
    },
  });

  const [templates, setTemplates] = useState(() => data?.getTemplates || []);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (data) setTemplates(data.getTemplates);
  }, [data]);

  return (
    <Box component="section" mb={100}>
      <StartWorkoutModal opened={opened} close={close} templates={templates} />
      <Flex
        gap="lg"
        justify={{ base: "center", lg: "flex-start" }}
        align="center"
        wrap="wrap"
        mb={20}
      >
        <Title order={2} tt="capitalize">
          Your Templates
        </Title>
        <Box style={{ flexGrow: 1 }}>
          <SearchTemplates
            setTemplates={setTemplates}
            templates={templates}
            data={data}
          />
        </Box>

        <Group justify="center">
          <Button onClick={open}>Start a workout</Button>
          <Button component={Link} to="/createtemplate">
            Create new Template
          </Button>
        </Group>
      </Flex>

      {error ? (
        <Center>
          <Text size="lg" fw={500}>
            Unable to get templates
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
          <TemplateList
            refetch={refetch}
            loading={loading}
            templates={templates}
          />
        </div>
      )}
    </Box>
  );
}
