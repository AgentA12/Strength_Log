import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, Colors
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

export const ExerciseChart = ({ exerciseData }) => {
  // console.log(exerciseData);
  // // const labels = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const labels = exerciseData.labels
  const dataSets = exerciseData.dataSets;
  var data = {
    labels,
    datasets: dataSets,
  };

  if (exerciseData) {
    return <Line options={options} data={data} />;
  }
};
