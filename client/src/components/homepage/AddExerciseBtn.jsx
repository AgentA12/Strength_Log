import { Button } from "@mantine/core";

export default function AddExerciseBtn({ addExercise }) {
  return (
    <Button variant="outline"  onClick={addExercise}>
      Add Exercise
    </Button>
  );
}
