import classes from "./dashboard.module.css";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import { RecentProgressPage } from "./index";
import {
  ByChartContainer,
  ExerciseChartSection,
} from "../components/progresspage";

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <Tabs defaultValue="recents">
        <Tabs.List>
          <Tabs.Tab value="recents">Recents</Tabs.Tab>
          <Tabs.Tab value="exercises">Exercises</Tabs.Tab>

          <Tabs.Tab value="templates">Templates</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="recents">
          <RecentProgressPage />
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
