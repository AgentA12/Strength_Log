import { Button } from "@mantine/core";

export default function StartWorkoutBtn() {
  function handleStartWorkout() {}
  return (
    <Button variant="outline" onClick={handleStartWorkout}>
      Start workout
    </Button>
  );
}
