import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Group, Loader, Box, Stack, Text, Title } from "@mantine/core";
import { GET_PROGRESS_BY_DATE } from "../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../app";
import { ExerciseTable } from "../components/progresspage/index";
import { v4 as uuidv4 } from "uuid";
import {
  getTotalReps,
  getTotalSets,
  getTotalVolume,
  getTotalVolumeForExercise,
} from "../utils/helpers/functions";

export default function SingleWorkout() {
  const {
    state: { workoutID },
  } = useLocation();

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, error, loading } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userID, workoutID: workoutID },
  });

  if (loading) return <Loader />;

  if (error) return <Text color="red">{error.message}</Text>;

  const selectedWorkout = data.getProgressByDate[0];
  const previousWorkout = data.getProgressByDate[1];

  function compareExerciseSets(setsOne, setsTwo) {
    let result;
    result = setsOne.map((set, i) => {
      if (setsTwo[i] != undefined) {
        return {
          ...set,
          change: set.weight - setsTwo[i].weight,
        };
      } else {
        return {
          ...set,
          change: "added set",
        };
      }
    });
    return result;
  }

  function compareWorkouts(selectedWorkout, previousWorkout) {
    let result = [];
    selectedWorkout.exercises.map((exercise) => {
      previousWorkout.exercises.map((exerciseTwo) => {
        if (exercise.exercise._id === exerciseTwo.exercise._id) {
          result.push({
            exerciseName: exercise.exercise.exerciseName,
            sets: compareExerciseSets(exercise.sets, exerciseTwo.sets),
          });
        }
      });
    });

    return result;
  }

  const workout = compareWorkouts(selectedWorkout, previousWorkout);

  return (
    <Stack gap={0} key={uuidv4()} mb={120}>
      <Title fw={600} c="teal.4">
        {new Date(
          parseInt(data.getProgressByDate[0].createdAt)
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Title>

      <Stack gap={0}>
        <Title order={2} tt="capitalize">
          {data.getProgressByDate[0].template.templateName.toString()}
        </Title>
        <Text size="xl">
          Total Volume: {getTotalVolume(selectedWorkout.exercises)} Lbs
        </Text>
      </Stack>

      {workout.map((exercise) => (
        <Box key={uuidv4()} mx={12} my={20} style={{ maxWidth: "900px" }}>
          <Group>
            <Text
              style={{ cursor: "pointer" }}
              td="underline"
              size="xl"
              c="teal.4"
              tt="capitalize"
              fw={700}
            >
              {exercise.exerciseName}
            </Text>
            <Text>Volume: {getTotalVolumeForExercise(exercise)}</Text>
            <Text>Reps: {getTotalReps(exercise)}</Text>
            <Text>Sets: {exercise.sets.length}</Text>
          </Group>
          <ExerciseTable exercise={exercise} />
        </Box>
      ))}
    </Stack>
  );
}
