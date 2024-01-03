import { Paper, useMantineColorScheme } from "@mantine/core";
import { cloneElement } from "react";

export default function ChartWrapper({ children }) {
  const unit = " Lbs";

  const { colorScheme } = useMantineColorScheme();

  const options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: false,
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
          callback: (label) => label + unit,
        },

        grid: {
          color: colorScheme === "dark" ? "#454545" : "#DEE2E6",
        },
      },
    },
  };

  const childWithProps = cloneElement(children, {
    unit: unit,
    options: options,
  });

  return (
    <Paper mah={1200} maw={1200} mt={12} withBorder bg={"dark.6"} p={12}>
      {childWithProps}
    </Paper>
  );
}
