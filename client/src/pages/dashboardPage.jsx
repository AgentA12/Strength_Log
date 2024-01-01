import classes from "./dashboard.module.css";
import {
  Box,
  Flex,
  Divider,
  Title,
  Container,
  Center,
  Stack,
} from "@mantine/core";
import { Calendar, TemplateSection, DataOverview, } from "../components/dashboard/index";

export default function DashBoardPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Dashboard</Title>}
        mb={10}
      />
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        gap="xl"
        grow="true"
      >
        <Stack style={{ flexGrow: 2, order: 2 }}>
          <DataOverview />
          <TemplateSection />
        </Stack>
        <Box className={classes.calenderContainer}>
          <Center>
            <Calendar />
          </Center>
        </Box>
      </Flex>
    </Container>
  );
}
