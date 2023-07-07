import { Select } from "@mantine/core";

export default function ExerciseSelect({ execises, setExercise }) {
  let exercises = [
    "All",
    "Bench press",
    "shoulder press",
    "dumbell bench press",
  ];
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={exercises}
      searchable
      defaultValue={"All"}
      description="Exercise(s)"
    />
  );
}
