import {
  Box,
  Flex,
  Divider,
  Title,
  Container,
  Center,
  Stack,
} from "@mantine/core";
import {
  Calendar,
  TemplateSection,
  DataOverview,
} from "../components/dashboard/index";
import DividerTitle from "../components/DividerTitle";

export default function DashBoardPage() {
  return (
    <Container fluid>
      <DividerTitle name="Dashboard" />
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        gap="xl"
      >
        <Stack style={{ flexGrow: 2, order: 2 }}>
          <DataOverview />
          <TemplateSection />
        </Stack>
        <Box>
          <Center>
            <Calendar />
          </Center>
        </Box>
      </Flex>
    </Container>
  );
}
