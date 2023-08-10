import { Select } from "@mantine/core";

export default function TypeSelect({ metric, setMetric }) {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={["Total weight", "Weight", "1RM"]}
      onChange={(value) => setMetric(value)}
      placeholder="Select metric"
      defaultValue={metric}
      description="Metric"
    />
  );
}
