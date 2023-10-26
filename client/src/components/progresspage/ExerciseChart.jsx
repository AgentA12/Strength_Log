import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS } from "../../utils/graphql/queries";
import {
  getRangeOfDates,
  findFirstAndLastRange,
} from "../../utils/helpers/functions";
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
import { Line } from "react-chartjs-2";
import { Box, LoadingOverlay, Text } from "@mantine/core";

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

export default function ExerciseChart({
  userId,
  range,
  metric,
  activeExercise,
  options,
}) {
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS, {
    variables: {
      userId: userId,
      templateName: "All templates",
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

  let filteredData;

  if (activeExercise !== "All Exercises") {
    filteredData = data?.getChartData.filter(
      (data) => data.label.toLowerCase() === activeExercise.toLowerCase()
    );
  } else {
    filteredData = data?.getChartData;
  }

  const labels = getRangeOfDates(range, ...findFirstAndLastRange(filteredData));

  return (
    <Line
      options={options}
      data={{
        labels: labels,
        datasets: filteredData,
      }}
    />
  );
}
