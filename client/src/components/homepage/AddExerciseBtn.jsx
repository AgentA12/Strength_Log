import { Button } from "@mantine/core";

export default function AddExerciseBtn({ clickHandler }) {
  return (
    <Button onClick={clickHandler}>
      Add Exercise
    </Button>
  );
}
