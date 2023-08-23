import { Button } from "@mantine/core";

export default function AddExerciseBtn({ clickHandler }) {
  return (
    <Button variant="outline" onClick={clickHandler}>
      Add Exercise
    </Button>
  );
}
