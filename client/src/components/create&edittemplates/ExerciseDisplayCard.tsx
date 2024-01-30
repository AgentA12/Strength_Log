import { Card, Text } from "@mantine/core";
import { ExerciseDetailsShape } from "../../types/template";

export default function ExerciseDisplayCard(props: ExerciseDetailsShape) {
  const { exerciseName } = props;
  return (
    <Card withBorder padding="md">
      <Text>{exerciseName}</Text>
    </Card>
  );
}
