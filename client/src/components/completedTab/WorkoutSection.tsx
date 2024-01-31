import { getTotalVolume } from "../../utils/helpers/functions";
import { ExerciseTable } from "../progresspage/index";
import { Box, Paper, Stack, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { DateLink } from "../progresspage/DateLink";
import { ExerciseLink } from "../progresspage/index";
import { Workout } from "../../types/workout";
import { Link } from "react-router-dom";
import TemplateProgressLink from "../universal/TemplateProgressLink";

interface Props {
  workout: Workout;
}

export default function SingleWorkout({ workout }: Props) {
  return (
    <Paper>
      <Stack justify="center" align="center" gap={0}>
        {workout.template ? (
          <DateLink
            workoutID={workout._id}
            createdAt={String(workout.createdAt)}
          />
        ) : (
          <Text c="dimmed" size="xl">
            {new Date(workout.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        )}
        {workout.template ? (
          <TemplateProgressLink size="xs" templateName={workout.template.templateName} />
        ) : (
          <Text c="red.6" fw={600} size="xl">
            This template was deleted permanently
          </Text>
        )}

        <Stack align="center" w="fit-content" gap={0}>
          <Text fw={600}>Total Volume</Text>
          <Text>{getTotalVolume(workout.exercises)} Lbs</Text>
        </Stack>
      </Stack>

      {workout.exercises.map((exercise) => (
        <Box key={uuidv4()} style={{ maxWidth: "800px" }}>
          <ExerciseLink exerciseName={exercise.exercise.exerciseName} />
          <ExerciseTable exercise={exercise} />
        </Box>
      ))}
    </Paper>
  );
}
