import { getTotalVolume } from "../../utils/helpers/functions";
import { ExerciseTable } from "./index";
import { Box, Paper, Stack, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { DateLink } from "./DateLink";
import { ExerciseLink } from "./ExerciseLink";

export default function SingleWorkout({ workout, setActiveTab }) {
  return (
    <Paper
      maw={900}
      radius="lg"
      shadow="xs"
      p="xl"
      m={12}
      withBorder
      key={uuidv4()}
    >
      <Stack justify="center" align="center" gap={0}>
        {workout.template ? (
          <DateLink
            linkUrl="/compare"
            workoutID={workout._id}
            createdAt={workout.createdAt}
          />
        ) : (
          <Text c="dimmed" size="xl">
            {new Date(parseInt(workout.createdAt)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        )}
        {workout.template ? (
          <Text tt="capitalize" fw={700} size="xl">
            {workout.template.templateName.toString()}{" "}
          </Text>
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
