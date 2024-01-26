import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatWorkoutState } from "../../utils/helpers/functions";
import { TemplateShape } from "../../types/template";

export default function StartWorkoutBtn({
  template,
}: {
  template: TemplateShape;
}) {
  const workoutState = formatWorkoutState(template);
  return (
    <Link to="/workout" state={{ template: workoutState }}>
      <Button>Start workout</Button>
    </Link>
  );
}
