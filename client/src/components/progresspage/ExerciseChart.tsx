import {
  useMantineColorScheme,
  Box,
  LoadingOverlay,
  Text,
  Overlay,
} from "@mantine/core";
import { Line } from "react-chartjs-2";
import {
  getRangeOfDates,
  findFirstAndLastRange,
} from "../../utils/helpers/functions";
import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS } from "../../utils/graphql/queries";

interface Props {
  activeExercise: string;
  userID: string;
  range: string;
  metric: string;
}

export default function ExerciseChart(props: Props) {
  const { userID, range, metric, activeExercise } = props;

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

  if (!activeExercise) {
    return (
      <Box style={{ position: "relative" }}>
        <Line
          options={options as any}
          data={{
            labels: [],
            datasets: [],
          }}
        />
      </Box>
    );
  }

  filteredData = data.getChartData.filter(
    (data) => data.label.toLowerCase() === activeExercise
  );

  if (filteredData.length === 0) {
    return (
      <Box style={{ position: "relative" }}>
        <Line
          options={options as any}
          data={{
            labels: [],
            datasets: [],
          }}
        />
      </Box>
    );
  }

  const [firstDate, lastDate] = findFirstAndLastRange(filteredData[0]?.data);

  const labels = getRangeOfDates(range, firstDate, lastDate);
  return (
    <Line
      options={options as any}
      data={{
        labels: labels,
        datasets: filteredData?.map((d) => {
          return {
            label: d.label,
            data: d.data.map((da) => {
              return { y: da.y, x: new Date(parseInt(da.x)) };
            }),
          };
        }),
      }}
    />
  );
}
