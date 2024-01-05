import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Divider, Tabs, Title } from "@mantine/core";
import { IconCheck, IconTemplate, IconStretching } from "@tabler/icons-react";
import { TemplateProgressPage, ExerciseProgressPage } from "./index";

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

        {activeTab === "recents" && (
          <Tabs.Panel value="recents">
            <RecentProgress setActiveTab={setActiveTab} />
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
      </Tabs>
    </Container>
  );
}
