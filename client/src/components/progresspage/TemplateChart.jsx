import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS } from "../../utils/graphql/queries";
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
import { findFirstAndLastRange } from "../../utils/helpers/functions";

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

export default function TemplateChart({
  activeTemplate,
  userId,
  range,
  metric,
  options,
}) {
  
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS, {
    variables: {
      userId: userId,
      templateName:
        activeTemplate === "All templates" ? "All templates" : activeTemplate,
      range: range,
      metric: metric,
      exercise: null,
      shouldSortByTemplate: true,
    },
  });

  if (loading)
    return (
      <Box sx={{ position: "relative" }}>
        <LoadingOverlay visible={true} overlayBlur={2} />
        <Line
          options={options}
          data={{
            labels: [],
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

  const labels = getRangeOfDates(
    range,
    ...findFirstAndLastRange(data.getChartData)
  );

  return (
    <Line
      options={options}
      data={{
        labels: labels,
        datasets: data.getChartData,
      }}
    />
  );
}

