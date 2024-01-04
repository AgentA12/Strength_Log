import { Select, Stack } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../../utils/graphql/queries";

export default function ExerciseSelect({
  setActiveExercise,
  activeExercise,
  userID,
  size = "md",
}) {
  const {
    data: exerciseData,
    loading: exerciseLoading,
    error: exerciseError,
  } = useQuery(GET_EXERCISES, {
    variables: {
      userId: userID,
    },
  });

  if (exerciseLoading) return <Select data={[]} />;

  if (exerciseError)
    return (
      <Stack gap={0} align="center">
        <Select color="red" data={[]} error={`${exerciseError.message}`} />
      </Stack>
    );

  let exercises = exerciseData.getAllExercises.map((e) => e.exerciseName);

  return (
    <Select
      style={{ width: "fit-content" }}
      data={exercises}
      value={activeExercise}
      onChange={(value) => setActiveExercise(value)}
      size={size}
    />
  );
}
