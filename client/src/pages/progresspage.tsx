import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import {
  IconCheck,
  IconTemplate,
  IconStretching,
  IconGitCompare,
} from "@tabler/icons-react";
import {
  TemplateProgressPage,
  ExerciseProgressPage,
  CompareWorkoutPage,
} from "./index";

import { RecentProgress } from "../components/progresspage/index";

export default function ProgressPage() {
  const location = useLocation();

  const { state } = location;

  const [activeTab, setActiveTab] = useState(() =>
    state ? state.activeTab : "recents"
  );

  useEffect(() => {
    if (state) {
      state.activeTab != activeTab && setActiveTab(state.activeTab);
    }
  }, [state]);

  return (
    <Container fluid>
      <Divider label={<Title>Progress</Title>} />
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab leftSection={<IconCheck size={16} />} value="recents">
            Workouts
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
          <Tabs.Tab leftSection={<IconGitCompare size={16} />} value="compare">
            Compare
          </Tabs.Tab>
        </Tabs.List>

        {activeTab === "recents" && (
          <Tabs.Panel value="recents">
            <RecentProgress />
          </Tabs.Panel>
        )}

        {activeTab === "templates" && (
          <Tabs.Panel value="templates">
            <TemplateProgressPage />
          </Tabs.Panel>
        )}

        {activeTab === "exercises" && (
          <Tabs.Panel value="exercises">
            <ExerciseProgressPage />
          </Tabs.Panel>
        )}

        {activeTab === "compare" && (
          <Tabs.Panel value="compare">
            <CompareWorkoutPage />
          </Tabs.Panel>
        )}
      </Tabs>
    </Container>
  );
}
