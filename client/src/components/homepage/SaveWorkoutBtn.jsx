import { Button } from "@mantine/core";

export default function SaveWorkoutBtn({ handleSaveWorkout, loading }) {
  return (
    <Button onClick={handleSaveWorkout} loading={loading} variant="outline" mt={15}>
      Save Workout
    </Button>
  );
}
