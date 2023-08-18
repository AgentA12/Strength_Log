import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function StartWorkoutBtn({ template }) {
  function handleStartWorkout() {}
  return (
    <Link to="/Workout" state={{ template: template }}>
      <Button variant="outline" onClick={handleStartWorkout}>
        Start workout
      </Button>
    </Link>
  );
}
