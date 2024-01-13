import { Select } from "@mantine/core";

type Range =
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months"
  | "All time";

interface Props {
  range:
    | "Last month"
    | "Last 3 months"
    | "Last 6 months"
    | "Last 12 months"
    | "All time";
  setRange: React.Dispatch<React.SetStateAction<Range>>;
}

export default function DateRangeSelect({
  range = "All time",
  setRange,
}: Props) {
  const dateRangeData = [
    "Last month",
    "Last 3 months",
    "Last 6 months",
    "Last 12 months",
    "All time",
  ];

  return (
    <Select
      data={dateRangeData}
      value={range}
      onChange={(value) => setRange(value ? (value as Range) : "All time")}
    />
  );
}
