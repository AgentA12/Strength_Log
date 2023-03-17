import { Button } from "@mantine/core";

export default function AddExerciseBtn({ addExercise }) {
  return (
    <Button variant="outline" color={'grape'} onClick={addExercise}>
      Add Exercise
    </Button>
  );
}
