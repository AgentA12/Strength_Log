import { Title, Box, Stack } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { ExerciseCard } from "../components/workoutpage/index";
import { Timer } from "../components/workoutpage/index";

export default function WorkoutPage() {
  const {
    state: { template },
  } = useLocation();

  return (
    <Stack justify="center" align="center">
      <Box>
        <Title mt={5}>{template.templateName}</Title>
      </Box>

      <Timer textSize={"xl"} />

      {template.exercises.map((exercise) => (
        <ExerciseCard
          template={template}
          exercise={exercise}
          key={exercise.exercise._id}
        />
      ))}
    </Stack>
  );
}
