import { Container, Divider, Tabs, Title } from "@mantine/core";
import { RecentProgress } from "../components/progresspage/index";
import TemplateProgressPage from "./TemplateProgressPage";
import ExerciseProgressPage from "./exerciseProgressPage";
import { IconTemplate, IconCheck, IconStretching } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ProgressPage() {
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState(
    state ? state.activeTab : "recents"
  );

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
        {/* the mantine tabs are all rendered right away, slowing down the page, so don't render them unless the need to be rendered */}
        {activeTab === "recents" ? (
          <Tabs.Panel value="recents">
            <RecentProgress setActiveTab={setActiveTab} />
          </Tabs.Panel>
        ) : null}

        {activeTab === "templates" ? (
          <Tabs.Panel value="templates">
            <TemplateProgressPage />
          </Tabs.Panel>
        ) : null}

        {activeTab === "exercises" ? (
          <Tabs.Panel value="exercises">
            <ExerciseProgressPage />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Container>
  );
}
