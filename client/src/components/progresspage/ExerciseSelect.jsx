import { Select } from "@mantine/core";

export default function ExerciseSelect({ exercises, setExercise }) {
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={[...exercises]}
      onChange={(value) => setExercise(value)}
      searchable
      defaultValue={"All"}
      description="Exercise(s)"
    />
  );
}
