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
      text: "Total Volume",
    },
  },
};

export const ExerciseChart = ({ exerciseData }) => {
  const labels = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  
    var data = {
      labels,
      datasets: [
        {
          label: "bench press",
          data: labels.map(() => [185, 190, 195, 200, 205]),
          borderColor: "#00EAFF",
        },
        {
          label: "shoulder press",
          data: labels.map(() => [105, 110, 115, 120, 125]),
          borderColor: "#FF00AA",
        },
        {
          label: "barbell row",
          data: labels.map(() => [205, 210, 215, 220, 225]),
          borderColor: "##AA00FF",
        },
      ],
    };
  

  if (exerciseData) {
    return <Line options={options} data={data} />;
  }
};
/*
 let example = [
    {
        label: "Bench Press",
        data: 
    }
]
 */
