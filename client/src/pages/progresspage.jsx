import classes from "./dashboard.module.css";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import { RecentProgress } from "../components/progresspage/index";
import TemplateProgressPage from "./TemplateProgressPage";
import ExerciseProgressPage from "./exerciseProgressPage";
import { IconTemplate, IconCheck, IconStretching } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ProgressPage() {
  const { state } = useLocation();
  console.log(state);
  
  const [activeTab, setActiveTab] = useState(
    state ? state.activeTab : "recents"
  );

  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab leftSection={<IconCheck size={16} />} value="recents">
            Recently Completed
          </Tabs.Tab>
          <Tabs.Tab leftSection={<IconTemplate size={16} />} value="templates">
            Templates
          </Tabs.Tab>

          <Tabs.Tab
            leftSection={<IconStretching size={16} />}
            value="exercises"
          >
            Exercises
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="recents">
          <RecentProgress setActiveTab={setActiveTab} />
        </Tabs.Panel>

        <Tabs.Panel value="templates">
          <TemplateProgressPage />
        </Tabs.Panel>

        <Tabs.Panel value="exercises">
          <ExerciseProgressPage />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
