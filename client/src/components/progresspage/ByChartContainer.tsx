import { Container, useMantineColorScheme } from "@mantine/core";
import { UserContext } from "../../app";
import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { ExerciseChartSection, TemplateChartSection } from "./index";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
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

export default function ByTemplatesContainer({ activeTab = "templates" }) {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const unit = "Lbs";

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
          callback: (label: string) => label + unit,
        },

        grid: {
          color: colorScheme === "dark" ? "#454545" : "#DEE2E6",
        },
      },
    },
  };

  const [range, setRange] = useState("Last month");
  const [activeTemplate, setActiveTemplate] = useState("");
  const [activeExercise, setActiveExercise] = useState("All Exercises");
  const [metric, setMetric] = useState("Total Volume");

  const { data: byTemplateData } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  return (
    <Container fluid>
      {activeTab === "templates" ? (
        <TemplateChartSection
          templates={byTemplateData?.getTemplates}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          setRange={setRange}
          range={range}
          userID={userID}
          options={options}
          setMetric={setMetric}
          metric={metric}
        />
      ) : (
        <ExerciseChartSection
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
          userID={userID}
          setRange={setRange}
          range={range}
          options={options}
          setMetric={setMetric}
          metric={metric}
        />
      )}
    </Container>
  );
}
