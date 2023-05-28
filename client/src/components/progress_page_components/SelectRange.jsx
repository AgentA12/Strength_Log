import { Select } from "@mantine/core";

export default function RangeSelect() {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={["Last three months", "Last six months", "Last twelve months", "All time"]}
      searchable
      placeholder="Select a range"
      description="Range"
    />
  );
}
