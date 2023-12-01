import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatWorkoutState } from "../../utils/helpers/functions";

export default function StartWorkoutBtn({ template }) {
  const workoutState = formatWorkoutState(template);
  return (
    <Link to="/Workout" state={{ template: workoutState }}>
      <Button>Start workout</Button>
    </Link>
  );
}
