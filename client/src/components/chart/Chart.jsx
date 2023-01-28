import { Paper } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total weight over time",
    },
  },
};

export const Chart = ({ loadChartSummaryData }) => {
  if (loadChartSummaryData) {
    var data = {
      labels: loadChartSummaryData?.getChartData.labels,
      datasets: [
        {
          label: "Total Volume",
          data: loadChartSummaryData?.getChartData.totalWeights,
          borderColor: "#BE4BDB",
          backgroundColor: "#121212",
        },
      ],
    };
  }

  if (loadChartSummaryData?.getChartData.labels.length) {
    return (
      <Paper className="w-full xl:w-7/12 rounded-3xl h-fit p-5 mt-4">
        <Line options={options} data={data} />
      </Paper>
    );
  }
};
