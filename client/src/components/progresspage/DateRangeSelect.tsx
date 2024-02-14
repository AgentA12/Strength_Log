import { Select } from "@mantine/core";
import { Range } from "../../types/range";

interface Props {
  range: Range;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
}

export default function DateRangeSelect({
  range = "all time",
  setRange,
}: Props) {
  const dateRangeData = [
    "last month",
    "last 3 months",
    "last 6 months",
    "last 12 months",
    "all time",
  ];

  return (
    <Select
      data={dateRangeData}
      value={range}
      onChange={(value) => setRange(value ? (value as Range) : "all time")}
    />
  );
}
