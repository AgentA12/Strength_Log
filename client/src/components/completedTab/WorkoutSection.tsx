import {
  getTotalReps,
  getTotalSets,
  getTotalVolume,
} from "../../utils/helpers/functions";
import { ExerciseTable } from "../progresspage/index";
import { Box, Paper, Stack, Text, Group } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { DateLink } from "../progresspage/DateLink";
import { ExerciseLink } from "../progresspage/index";
import { Workout } from "../../types/workout";

interface Props {
  workout: Workout;
}

export default function SingleWorkout({ workout }: Props) {
  return (
    <>
      <Stack gap={0}>
        <DateLink
          size="lg"
          workoutID={workout._id}
          createdAt={String(workout.createdAt)}
        />

        <Group justify="space-around">
          <Stack align="center" w="fit-content" gap={0}>
            <Text fw={600}>Total Volume</Text>
            <Text>{getTotalVolume(workout.exercises)} Lb</Text>
          </Stack>
          <Stack align="center" w="fit-content" gap={0}>
            <Text fw={600}>Total Sets</Text>
            <Text>{getTotalSets(workout.exercises)}</Text>
          </Stack>
          <Stack align="center" w="fit-content" gap={0}>
            <Text fw={600}>Total Reps</Text>
            <Text>{getTotalReps(workout.exercises)}</Text>
          </Stack>
        </Group>
      </Stack>

      {workout.exercises.map((exercise) => (
        <Box key={uuidv4()} style={{ maxWidth: "800px" }}>
          <ExerciseLink exerciseName={exercise.exercise.exerciseName} />
          <ExerciseTable exercise={exercise} />
        </Box>
      ))}
    </>
  );
}
