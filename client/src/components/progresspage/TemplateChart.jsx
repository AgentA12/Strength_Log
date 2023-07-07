// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Total weight over time",
//     },
//   },
// };

// export default function TemplateChart({ loadChartSummaryData }) {
//   if (loadChartSummaryData) {
//     var data = {
//       labels: loadChartSummaryData?.getChartData.labels,
//       datasets: [
//         {
//           label: "Total Volume",
//           data: loadChartSummaryData?.getChartData.totalWeights,
//           borderColor: "#D84C92",
//           backgroundColor: "#D84C92",
//         },
//       ],
//     };
//   }

//   if (loadChartSummaryData?.getChartData.labels.length) {
//     return <Line options={options} data={data} />;
//   }
// }

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    date: "2023 July 1",
    "bench press": 4000,
    "shoulder press": 2400,
    "Incline dumbell press": 1500,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 2",
    "bench press": 3000,
    "shoulder press": 2210,
    "Incline dumbell press": 1000,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 3",
    "bench press": null,
    "shoulder press": 2290,
    "Incline dumbell press": 1000,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 4",
    "bench press": 2780,
    "shoulder press": 2000,
    "Incline dumbell press": 800,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 5",
    "bench press": 1890,
    "shoulder press": 2181,
    "Incline dumbell press": 1000,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 6",
    "bench press": 2390,
    "shoulder press": 2500,
    "Incline dumbell press": 1000,
    "Dumbell row": 500,
  },
  {
    date: "2023 July 7",
    "bench press": 3490,
    "shoulder press": 2100,
    "Incline dumbell press": 1200,
    "Dumbell row": 500,
  },
];

export default function TemplateChart({ loading }) {
  if (loading)
    return (
      <ResponsiveContainer width={"100%"} height={550}>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 5,
            bottom: 15,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    );

  return (
    <ResponsiveContainer width={"100%"} height={550}>
      <LineChart
        data={data}
        margin={{
          top: 30,
          right: 5,
          bottom: 15,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Line
          stroke="#EA39CA"
          type="monotone"
          dataKey="Dumbell row"
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="Incline dumbell press"
          stroke="#3987EA"
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="bench press"
          stroke="#8884d8"
          activeDot={{ r: 2 }}
        />
        <Line type="monotone" dataKey="shoulder press" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
