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
import DividerTitle from "../components/DividerTitle";

export default function ProgressPage() {
  const location = useLocation();

  const { state } = location;

  const [activeTab, setActiveTab] = useState(() =>
    state ? state.activeTab : "workouts"
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
        <Tabs.List>
          <Tabs.Tab leftSection={<IconCheck size={16} />} value="workouts">
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

        {activeTab === "workouts" && (
          <Tabs.Panel value="workouts">
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
