import { Select } from "@mantine/core";

export default function MetricSelect({ metric = "Estimated 1RM", setMetric }) {
  return (
    <Select
      style={{ width: "fit-content" }}
      data={["Total Volume", "Estimated 1RM"]}
      onChange={(value) => setMetric(value)}
      value={metric}
    />
  );
}
