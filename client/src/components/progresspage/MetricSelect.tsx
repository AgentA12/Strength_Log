import { Select } from "@mantine/core";
import { SetStateAction } from "react";

interface Props {
  metric: string;
  setMetric: React.Dispatch<SetStateAction<"Estimated 1RM" | "Total Volume">>;
}

export default function MetricSelect({
  metric = "Estimated 1RM",
  setMetric,
}: Props) {
  const metricData = ["Total Volume", "Estimated 1RM"];
  return (
    <Select
      style={{ width: "fit-content" }}
      data={metricData}
      onChange={(value) => setMetric(value as "Estimated 1RM" | "Total Volume")}
      value={metric}
    />
  );
}
