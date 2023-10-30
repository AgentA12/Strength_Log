import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function StartWorkoutBtn({ template }) {
  let workoutState = template.exercises.map((exercise) => {
    return {
      ...exercise,
      completed: false,
    };
  });

  workoutState.templateName = template.templateName;
  workoutState.templateId = template._id

  return (
    <Link to="/Workout" state={{ template: workoutState }}>
      <Button>Start workout</Button>
    </Link>
  );
}
