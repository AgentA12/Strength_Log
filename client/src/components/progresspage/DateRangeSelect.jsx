import { Select } from "@mantine/core";

export default function DateRangeSelect({ range, setRange }) {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={[
        "Last month",
        "Last 3 months",
        "Last 6 months",
        "Last 12 months",
        "All time",
      ]}
      placeholder="Select a range"
      defaultValue={"All time"}
      description="Range"
      value={range}
      onChange={(value) => setRange(value)}
    />
  );
}
