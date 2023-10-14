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

export default function TemplateChart({
  activeTemplate,
  userId,
  range,
  metric,
  options,
}) {
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS_BY_TEMPLATE, {
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

  console.log(data);

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
    ...findFirstAndLastRange(data?.getChartDataForTemplates)
  );

  return (
    <Line
      options={options}
      data={{
        labels: labels,
        datasets: data?.getChartDataForTemplates,
      }}
    />
  );
}

function findFirstAndLastRange(dataSet) {
  let greatestDate = new Date(0);

  for (let i = 0; i < dataSet.length; i++) {
    dataSet[i].data.map((d) =>
      new Date(d.x).getTime() > new Date(greatestDate).getTime()
        ? (greatestDate = d.x)
        : null
    );
  }

  let smallestDate = new Date(greatestDate);

  for (let x = 0; x < dataSet.length; x++) {
    dataSet[x].data.map((d) =>
      new Date(d.x).getTime() < new Date(smallestDate).getTime()
        ? (smallestDate = d.x)
        : null
    );
  }

  return [smallestDate, greatestDate];
}
