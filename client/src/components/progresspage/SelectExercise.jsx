import { Select } from "@mantine/core";

export default function ExerciseSelect() {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={["All exercises", "Bench press", "Deadlift", "Squat", "Barbell row", "Hip thurst"]}
      searchable
      placeholder="Select exercise"
      description="Exercises"
    />
  );
}
