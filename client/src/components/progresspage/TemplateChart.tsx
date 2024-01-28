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
import { ChartData } from "../../types/chartdata";

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

type Range =
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months"
  | "All time";

interface Props {
  activeTemplate: string;
  range: Range;
  metric: string;
  userID: string;
  options?: {
    responsive: boolean;
    spanGaps: boolean;
    plugins: { legend: boolean };
    scales: {
      x: { type: string; time: { unit: string }; grid: { color: string } };
      y: {
        ticks: { callback: (label: string) => string };
        grid: { color: string };
      };
    };
  };
}

export default function TemplateChart(props: Props) {
  const { activeTemplate, range, metric, options, userID } = props;

  const { loading, data, error } = useQuery(GET_CHART_PROGRESS, {
    variables: {
      userId: userID,
      templateName: activeTemplate,
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
          Oops! Something went wrong, Try refreshing the page
        </Text>
        <Text size={"xl"} color="red">
          {error.message}
        </Text>
      </Box>
    );

  if (data.getChartData.length === 0) {
    return (
      <Line
        options={options as any}
        data={{
          labels: [],
          datasets: [],
        }}
      />
    );
  }

  const [firstRange, lastRange] = findFirstAndLastRange(
    data.getChartData[0].data
  );
  const labels = getRangeOfDates(range, firstRange, lastRange);

  return (
    <Line
      options={options as any}
      data={{
        labels: [...labels],
        datasets: data.getChartData.map((chartData: ChartData) => {
          return {
            label: chartData.label,
            data: chartData.data.map((da) => {
              return { x: new Date(parseInt(da.x)), y: da.y };
            }),
          };
        }),
      }}
    />
  );
}
