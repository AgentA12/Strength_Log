import { createStyles, Tabs, useMantineColorScheme } from "@mantine/core";
import { UserContext } from "../../App";
import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { ExerciseChartSection, TemplateChartSection } from "./index";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { IoMdFitness } from "react-icons/io";
import { HiOutlineTemplate } from "react-icons/hi";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { useMediaQuery } from "@mantine/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale
);

const useStyles = createStyles(() => ({
  chartContainer: {
    height: "700px",
  },
}));

export default function ByTemplatesContainer() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const isLargeScreen = useMediaQuery("(max-width: 48em)");

  const unit = " Lbs";

  const { colorScheme } = useMantineColorScheme();

  const options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        grid: {
          color: colorScheme === "dark" ? "#454545" : "#DEE2E6",
        },
      },
      y: {
        ticks: {
          callback: (label) => label + unit,
        },

        grid: {
          color: colorScheme === "dark" ? "#454545" : "#DEE2E6",
        },
      },
    },
  };

  const { classes } = useStyles();

  const [range, setRange] = useState("Last month");
  const [activeTab, setActiveTab] = useState("Templates");
  const [activeTemplate, setActiveTemplate] = useState("All templates");
  const [activeExercise, setActiveExercise] = useState("All Exercises");
  const [metric, setMetric] = useState("Total Volume");

  const {
    data: byTemplateData,
    loading: byTemplateLoading,
    error: byTemplateError,
  } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  return (
    <Tabs value={activeTab} onTabChange={(value) => setActiveTab(value)}>
      <Tabs.List position={isLargeScreen ? "center" : "left"}>
        <Tabs.Tab value="Templates" icon={<HiOutlineTemplate />}>
          Templates
        </Tabs.Tab>

        <Tabs.Tab value="Exercises" icon={<IoMdFitness />}>
          Exercises
        </Tabs.Tab>
      </Tabs.List>

      {activeTab === "Templates" ? (
        <TemplateChartSection
          templates={byTemplateData?.getTemplates}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          setRange={setRange}
          range={range}
          userID={userID}
          options={options}
          classes={classes}
          setMetric={setMetric}
          metric={metric}
        />
      ) : (
        <ExerciseChartSection
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
          userID={userID}
          setRange={setRange}
          classes={classes}
          activeTemplate={activeTemplate}
          range={range}
          options={options}
        />
      )}
    </Tabs>
  );
}
