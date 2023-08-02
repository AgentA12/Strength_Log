import { Button } from "@mantine/core";

export default function SaveWorkoutBtn({
  handleSaveWorkout,
  loading,
  templateState,
}) {
  return (
    <Button
      onClick={() => handleSaveWorkout(templateState)}
      loading={loading}
      variant="outline"
   
    >
      Quick Save
    </Button>
  );
}
