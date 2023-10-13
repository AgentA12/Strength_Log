import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function StartWorkoutBtn({ template }) {
  template.exercises = template.exercises.map((exercise) => {
    return {
      ...exercise,
      completed: false,
    };
  });

  return (
    <Link to="/Workout" state={{ template: template }}>
      <Button>Start workout</Button>
    </Link>
  );
}
