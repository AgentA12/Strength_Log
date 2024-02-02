import { Center, Container, Tabs, Text } from "@mantine/core";
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
} from "../../pages/index";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const iconSize = 16;

const tabs = [
  // {
  //   icon: <IconCheck size={iconSize} />,
  //   value: "completed",
  //   label: "completed",
  //   pageComponent: <RecentProgress />,
  //   key: 0,
  // },
  {
    icon: <IconTemplate size={iconSize} />,
    value: "templates",
    label: "templates",
    pageComponent: <TemplateProgressPage />,
    key: 1,
  },
  {
    icon: <IconStretching size={iconSize} />,
    value: "exercises",
    label: "exercises",
    pageComponent: <ExerciseProgressPage />,
    key: 2,
  },
  {
    icon: <IconGitCompare size={iconSize} />,
    value: "compare",
    label: "compare",
    pageComponent: <CompareWorkoutPage />,
    key: 3,
  },
];

type Tab = (typeof tabs)[0];

type possibleTabs = "templates" | "exercises" | "compare";

export default function ProgressTabs() {
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState<possibleTabs>(() =>
    state ? state.activeTab : "templates"
  );

  useEffect(() => {
    if (state) {
      state.activeTab != activeTab && setActiveTab(state.activeTab);
    }
  }, [state]);

  return (
    <Container fluid>
      <Tabs
        value={activeTab}
        onChange={(val) => {
          setActiveTab(val as possibleTabs);
        }}
      >
        <Tabs.List justify="center" grow>
          {tabs.map((tab: Tab) => (
            <Tabs.Tab key={tab.key} leftSection={tab.icon} value={tab.value}>
              <Text tt="capitalize" size="sm" fw={700}>
                {tab.label}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map(
          (tab: Tab) =>
            activeTab === tab.value && (
              <Tabs.Panel key={tab.key} value={tab.value}>
                {tab.pageComponent}
              </Tabs.Panel>
            )
        )}
      </Tabs>
    </Container>
  );
}
