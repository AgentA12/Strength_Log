import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS_BY_TEMPLATE } from "../../utils/graphql/queries";
import { Box, LoadingOverlay, Text } from "@mantine/core";
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
  const lastSavedExerciseDate = "2023-09-01";

  const labels = getRangeOfDates(
    range,
    firstSavedExeciseDate,
    lastSavedExerciseDate
  );
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS_BY_TEMPLATE, {
    variables: {
      userId: userId,
      templateName:
        activeTemplate === "All templates" ? "All templates" : activeTemplate,
      range: range,
      metric: metric,
      exercise: null,
    },
  });

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

  return (
    <Line
      options={options}
      data={{
        labels: labels,
        datasets: data.getChartDataForTemplates,
      }}
    />
  );
}
