import { Select, Text } from "@mantine/core";

export default function DateRangeSelect({ range = "All time", setRange }) {
  return (
    <Select
      data={[
        "Last month",
        "Last 3 months",
        "Last 6 months",
        "Last 12 months",
        "All time",
      ]}
      value={range}
      onChange={(value) => setRange(value)}
    />
  );
}
