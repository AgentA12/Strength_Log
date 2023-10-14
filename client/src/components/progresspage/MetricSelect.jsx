import { Select } from "@mantine/core";

export default function MetricSelect({ setMetric, metric }) {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={["Total Volume", "Total Reps", "Est 1 RM"]}
      onChange={(value) => setMetric(value)}
      placeholder="Select metric"
      defaultValue={metric}
    />
  );
}
