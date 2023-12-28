import { useLocation } from "react-router-dom";
import { WorkoutSection } from "../components/progresspage/index";
import { gql, useQuery } from "@apollo/client";
import { Loader, Box, Stack, Text } from "@mantine/core";
import { GET_PROGRESS_BY_DATE } from "../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../app";
import { ExerciseTable } from "../components/progresspage/index";
import { v4 as uuidv4 } from "uuid";

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

  const workout = {
    createdAt: Date.now(),
    exercises: [
      {
        exercise: { exerciseName: "Bench press" },
        change: 12,
        sets: [
          {
            weight: 155,
            reps: 5,
          },
        ],
      },
    ],
  };

  return (
    <Box key={uuidv4()}>
      <Text>
        {new Date(parseInt(workout.createdAt)).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text>Upper Body</Text>

      <Stack gap={0}>
        <Text>Total Volume</Text>
        <Text>123455</Text>
      </Stack>

      {workout.exercises.map((exercise) => (
        <Box key={uuidv4()} style={{ maxWidth: "900px" }}>
          <ExerciseTable exercise={exercise} />
        </Box>
      ))}
    </Box>
  );
}
