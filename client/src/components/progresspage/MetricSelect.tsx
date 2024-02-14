import { Select } from "@mantine/core";
import { SetStateAction } from "react";

interface Props {
  metric: string;
  setMetric: React.Dispatch<SetStateAction<"estimated 1rm" | "total volume">>;
}

export default function MetricSelect({
  metric = "Estimated 1RM",
  setMetric,
}: Props) {
  const metricData = ["total volume", "estimated 1rm"];
  return (
    <Select
      style={{ width: "fit-content" }}
      data={metricData}
      onChange={(value) => setMetric(value as "estimated 1rm" | "total volume")}
      value={metric}
    />
  );
}
