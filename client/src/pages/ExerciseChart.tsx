import {
  useMantineColorScheme,
  Box,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { Line } from "react-chartjs-2";
import {
  getRangeOfDates,
  findFirstAndLastRange,
} from "../utils/helpers/functions";
import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS } from "../utils/graphql/queries";

export default function ExerciseChart({
  userID,
  range,
  metric,
  activeExercise,
  options,
}) {
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS, {
    variables: {
      userId: userID,
      templateName: "All templates",
      range: range,
      metric: metric,
      exercise: null,
      shouldSortByTemplate: true,
    },
  });

  if (loading)
    return (
      <Box style={{ position: "relative" }}>
        <LoadingOverlay
          visible={true}
          overlayProps={{
            blur: 1,
          }}
        />
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
        <Text size={"xl"} c="red.6">
          Oops! Something went wrong
        </Text>
        <Text size={"xl"} c="red.6">
          {error.message}
        </Text>
      </Box>
    );

  let filteredData;

  filteredData = data.getChartData.filter(
    (data) => data.label.toLowerCase() === activeExercise
  );

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
