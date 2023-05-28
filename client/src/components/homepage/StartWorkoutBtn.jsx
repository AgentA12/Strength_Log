import { Button } from "@mantine/core";
import {MdSportsGymnastics} from "react-icons/md"

export default function StartWorkoutBtn() {
  function handleStartWorkout() {}
  return (
    <Button
      leftIcon={<MdSportsGymnastics />}
      variant="outline"
      onClick={handleStartWorkout}
    >
      Start Workout
    </Button>
  );
}
