import { useQuery } from "@apollo/client";
import { GET_TEMPLATE_PROGRESS } from "../../utils/graphql/queries";
import { Box, Text, Image, Loader, Center } from "@mantine/core";
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
import shockedMan from "./shocked_guy.gif";

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

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const labels = getDaysArray("2023-07-25", new Date());

const testdata = {
  labels,
  datasets: [
    {
      label: "Bench press",
      data: [
        Math.random() * 100,
        null,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        null,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        null,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
    {
      label: "Pull ups",
      data: labels.map(() => Math.random() * 100),
    },
  ],
};

function getDaysArray(start, end) {
  var options = {
    month: "long",
    day: "numeric",
  };
  for (
    var a = [], d = new Date(start);
    d <= new Date(end);
    d.setDate(d.getDate() + 1)
  ) {
    a.push(new Date(d).toLocaleDateString("en-us", options));
  }
  return a;
}

export default function TemplateChart({ activeTemplate, userId, range }) {
  const { loading, error, data } = useQuery(GET_TEMPLATE_PROGRESS, {
    variables: {
      userId: userId,
      templateId: activeTemplate === "All templates" ? null : activeTemplate.id,
      range: range,
      metric: null,
      exercises: null,
    },
  });

  const options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        position: "bottom",
      },

      title: {
        display: false,
        text: `${activeTemplate}`,
      },
    },
  };

  if (loading)
    return (
      <Center mt={100}>
        <Loader size="lg" />
      </Center>
    );

  if (data) console.log(data);

  if (error)
    return (
      <Box color="red" my={20}>
        <Image maw={400} radius="md" src={shockedMan} alt="Shocked man" />
        <Text size={"xl"} color="red">
          Oops! Something went wrong
        </Text>
        <Text size={"xl"} color="red">
          {error.message}
        </Text>
      </Box>
    );

  return <Line options={options} data={testdata} />;
}
