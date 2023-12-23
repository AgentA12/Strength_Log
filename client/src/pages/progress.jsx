import classes from "./dashboard.module.css";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import { RecentProgressPage } from "./index";

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <Tabs defaultValue="recents">
        <Tabs.List>
          <Tabs.Tab value="recents">Recents</Tabs.Tab>

          <Tabs.Tab value="templates">Templates</Tabs.Tab>
          <Tabs.Tab value="exercises">Exercises</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="recents">
          <RecentProgressPage />
        </Tabs.Panel>

        <Tabs.Panel value="templates">template section</Tabs.Panel>

        <Tabs.Panel value="exercises">exercise section</Tabs.Panel>
      </Tabs>
    </Container>
  );
}
