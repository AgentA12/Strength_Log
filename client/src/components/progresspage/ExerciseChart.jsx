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
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total Weight",
    },
  },
};

export default function ExerciseChart({ exerciseData }) {
  const labels = exerciseData.labels;
  const dataSets = exerciseData.dataSets;

  var data = {
    labels,
    datasets: dataSets,
  };

  if (exerciseData) {
    return (
      <Paper>
        <Line options={options} data={data} />
      </Paper>
    );
  }
}
