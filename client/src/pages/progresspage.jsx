import classes from "./dashboard.module.css";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import {
  ByChartContainer,
  RecentProgress,
} from "../components/progresspage/index";

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <Tabs defaultValue="recent">
        <Tabs.List>
          <Tabs.Tab value="recent">Recently Completed</Tabs.Tab>
          <Tabs.Tab value="exercises">Exercises</Tabs.Tab>

          <Tabs.Tab value="templates">Templates</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="recent">
          <RecentProgress />
        </Tabs.Panel>

        <Tabs.Panel value="templates">
          <ByChartContainer activeTab="templates" />
        </Tabs.Panel>

        <Tabs.Panel value="exercises">
          <ByChartContainer activeTab="exercises" />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
