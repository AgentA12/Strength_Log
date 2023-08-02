import { Select } from "@mantine/core";

export default function TypeSelect() {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={["Total weight", "Repetitions", "Sets", "Weight"]}
      searchable
      placeholder="Select metric"
      defaultValue={"Total weight"}
      description="Metric"
      transitionProps={{
        transition: "pop-top-left",
        duration: 80,
        timingFunction: "ease",
      }}
    />
  );
}
