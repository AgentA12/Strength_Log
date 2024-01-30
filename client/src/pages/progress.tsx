import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Tabs } from "@mantine/core";
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
  RecentProgress,
} from "./index";

import DividerTitle from "../components/universal/DividerTitle";

export default function ProgressPage() {
  const location = useLocation();

  const { state } = location;

  const [activeTab, setActiveTab] = useState(() =>
    state ? state.activeTab : "completed"
  );

  useEffect(() => {
    if (state) {
      state.activeTab != activeTab && setActiveTab(state.activeTab);
    }
  }, [state]);

  function handleTabChange(val: string) {
    setActiveTab(val);
  }

  return (
    <Container fluid>
      <DividerTitle name="Progress" />
      <Tabs
        value={activeTab}
        onChange={(val) => handleTabChange(val as string)}
      >
        <Tabs.List mb={20} grow>
          <Tabs.Tab leftSection={<IconCheck size={16} />} value="completed">
            Completed
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

        {activeTab === "completed" && (
          <Tabs.Panel value="completed">
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
