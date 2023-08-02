import { Select } from "@mantine/core";

export default function RangeSelect({ range, setRange }) {
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
      searchable
      placeholder="Select a range"
      defaultValue={"All time"}
      description="Range"
      value={range}
      onChange={(value) => setRange(value)}
      transitionProps={{
        transition: "pop-top-left",
        duration: 80,
        timingFunction: "ease",
      }}
    />
  );
}
