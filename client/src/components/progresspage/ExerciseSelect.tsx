import { Select, Stack } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../../utils/graphql/queries";
import { SetStateAction } from "react";
import { ExerciseDetailsShape } from "../../types/template";

interface Props {
  setActiveExercise: React.Dispatch<SetStateAction<string>>;
  activeExercise: string;
  userID: string;
  size?: string;
}

export default function ExerciseSelect({
  setActiveExercise,
  activeExercise,
  userID,
  size = "md",
}: Props) {
  const {
    data: exerciseData,
    loading: exerciseLoading,
    error: exerciseError,
  } = useQuery(GET_EXERCISES, {
    variables: {
      userId: userID,
    },
  });

  if (exerciseLoading) return <Select disabled />;

  if (exerciseError)
    return (
      <Stack gap={0} align="center">
        <Select color="red" error={`${exerciseError.message}`} />
      </Stack>
    );

  const exerciseNames = exerciseData.getAllExercises.map(
    ({ exerciseName }: ExerciseDetailsShape) => exerciseName
  );

  return (
    <Select
      style={{ width: "fit-content" }}
      data={exerciseNames}
      value={activeExercise}
      onChange={(value) => setActiveExercise(value as string)}
      size={size}
    />
  );
}
