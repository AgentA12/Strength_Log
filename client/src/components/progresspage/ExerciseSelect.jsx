import { Select } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../../utils/graphql/queries";

export default function ExerciseSelect({
  setActiveExercise,
  activeExercise,
  userID,
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

  if (exerciseLoading) return <Select data={[]}/>;

  if (exerciseError) return exerciseError.message.toString();

  let exercises = exerciseData.getAllExercises.map((e) => e.exerciseName);

  exercises.unshift("All Exercises");

  return (
    <Select
      data={exercises}
      value={activeExercise}
      onChange={(value) => setActiveExercise(value)}
    />
  );
}
