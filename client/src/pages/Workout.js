import { Title, Text, Stack } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { ExerciseCard } from "../components/workoutpage/index";
import { Timer } from "../components/workoutpage/index";
import { useState } from "react";

export default function WorkoutPage() {
  const {
    state: { template },
  } = useLocation();

  template.exercises = template.exercises.map((exercise) => {
    exercise.completed = false;
    exercise.started = false;

    return exercise;
  });

  const [workoutState, setWorkoutState] = useState(template);

  return (
    <Stack justify="center" align="center">
      <Title
        variant="gradient"
        gradient={{ from: "#662D8C", to: " #ED1E79", deg: 90 }}
        mt={5}
      >
        {template.templateName}
      </Title>

      <Timer textSize={"xl"} />

      {template.exercises.map((exercise) => (
        <ExerciseCard
          template={template}
          exercise={exercise}
          completed={exercise.completed}
          key={exercise.exercise._id}
        />
      ))}
    </Stack>
  );
}
