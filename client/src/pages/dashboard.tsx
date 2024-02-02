import { Flex, Container, Stack, Center } from "@mantine/core";
import {
  Calendar,
  TemplateSection,
  DataOverview,
  RecentlyCompleted,
} from "../components/dashboard/index";
import DividerTitle from "../components/universal/DividerTitle";

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

        <Flex
          align={{ base: "center",  }}
          justify={{ base: "center", lg: "flex-start" }}
          direction={{ base: "row", lg: "column" }}
          gap="md"
        >
          <Calendar />

          <RecentlyCompleted />
        </Flex>
      </Flex>
    </Container>
  );
}
