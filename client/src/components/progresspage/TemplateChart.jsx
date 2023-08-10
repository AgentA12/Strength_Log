import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS_BY_TEMPLATE } from "../../utils/graphql/queries";
import { Box, Text, LoadingOverlay } from "@mantine/core";
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
import { getRangeOfDates } from "../../utils/helpers/functions";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { Line } from "react-chartjs-2";

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

const unit = " Lbs";

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
    },
    y: {
      ticks: {
        callback: (label) => label + unit,
      },
    },
  },
};

export default function TemplateChart({
  activeTemplate,
  userId,
  range,
  metric,
}) {

  const firstSavedExeciseDate = "2023-05-20";
  const lastSavedExerciseDate = "2023-08-01";

  const { loading, error } = useQuery(GET_CHART_PROGRESS_BY_TEMPLATE, {
    variables: {
      userId: userId,
      templateId: activeTemplate === "All templates" ? null : activeTemplate.id,
      range: range,
      metric: metric,
      exercise: null,
    },
  });

  const labels = getRangeOfDates(
    range,
    firstSavedExeciseDate,
    lastSavedExerciseDate
  );

  const testdata = {
    labels,
    datasets: [
      {
        label: "Bench press",
        data: [
          { x: "2023-07-05", y: 155 },
          { x: "2023-07-06", y: 155 },
          { x: "2023-07-10", y: 160 },
          { x: "2023-07-11", y: 160 },
          { x: "2023-07-15", y: 165 },
          { x: "2023-07-16", y: 165 },
          { x: "2023-07-20", y: 165 },
          { x: "2023-07-21", y: 165 },
          { x: "2023-07-25", y: 170 },
          { x: "2023-07-26", y: 170 },
          { x: "2023-07-30", y: 170 },
          { x: "2023-08-01", y: 170 },
        ],
      },

      {
        label: "Squats",
        data: [
          { x: "2023-06-29", y: 205 },
          { x: "2023-07-03", y: 225 },
          { x: "2023-07-04", y: 225 },
          { x: "2023-07-05", y: 225 },
          { x: "2023-07-06", y: 225 },
          { x: "2023-07-10", y: 230 },
          { x: "2023-07-11", y: 230 },
          { x: "2023-07-15", y: 230 },
          { x: "2023-07-16", y: 230 },
          { x: "2023-07-20", y: 220 },
          { x: "2023-07-21", y: 220 },
        ],
      },
      {
        label: "Deadlift",
        data: [
          { x: "2023-06-05", y: 315 },
          { x: "2023-06-06", y: 315 },
          { x: "2023-06-10", y: 320 },
          { x: "2023-06-11", y: 320 },
          { x: "2023-06-15", y: 350 },
          { x: "2023-06-16", y: 350 },
          { x: "2023-06-20", y: 350 },
          { x: "2023-06-21", y: 350 },
        ],
      },

      {
        label: "Barbell row",
        data: [
          { x: "2023-05-20", y: 185 },
          { x: "2023-05-21", y: 185 },
          { x: "2023-05-22", y: 185 },
          { x: "2023-05-26", y: 195 },
          { x: "2023-05-27", y: 190 },
          { x: "2023-05-30", y: 190 },
          { x: "2023-05-31", y: 195 },
        ],
      },

      {
        label: "Dumbell incline press",
        data: [
          { x: "2023-06-20", y: 60 },
          { x: "2023-06-21", y: 60 },
          { x: "2023-06-22", y: 60 },
          { x: "2023-06-26", y: 60 },
          { x: "2023-06-27", y: 65 },
          { x: "2023-06-30", y: 65 },
          { x: "2023-06-31", y: 65 },
        ],
      },
    ],
  };

  if (loading)
    return (
      <Box sx={{ position: "relative" }}>
        <LoadingOverlay visible={true} overlayBlur={2} />
        <Line
          options={options}
          data={{
            labels,
            datasets: [],
          }}
        />
      </Box>
    );

  if (error)
    return (
      <Box color="red" my={20}>
        <Text size={"xl"} color="red">
          Oops! Something went wrong
        </Text>
        <Text size={"xl"} color="red">
          {error.message}
        </Text>
      </Box>
    );

  return <Line  options={options} data={testdata} />;
}
