import { Paper, useMantineColorScheme } from "@mantine/core";
import { cloneElement } from "react";

export default function ChartWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
          callback: (label: string) => (label ? label + unit : label),
        },
        grid: {
          color: colorScheme === "dark" ? "#454545" : "#DEE2E6",
        },
      },
    },
  };

  const childWithProps = children
    ? cloneElement(children as React.ReactElement, {
        options,
      })
    : null;

  return (
    <Paper
      mah={1200}
      maw={1200}
      mt={12}
      withBorder
      bg={colorScheme === "dark" ? "dark.6" : "gray.1"}
      p={15}
    >
      {childWithProps}
    </Paper>
  );
}
