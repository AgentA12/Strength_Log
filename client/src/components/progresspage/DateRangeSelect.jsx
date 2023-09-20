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
      defaultValue={"Last month"}
      value={range}
      onChange={(value) => setRange(value)}
    />
  );
}
