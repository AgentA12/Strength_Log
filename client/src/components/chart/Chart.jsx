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
          borderColor: "#BB86FC",
          backgroundColor: "#121212",
        },
      ],
    };
  }

  if (loadChartSummaryData?.getChartData.labels.length) {
    return <Line options={options} data={data} />;
  } 
};
