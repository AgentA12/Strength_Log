import { Text, Group, Box } from "@mantine/core";
import CompareText from "./CompareText";
import { getTotalVolumeForExercise } from "../../utils/helpers/functions";
import { ExerciseLink } from "../progresspage/index";
import { SetShape, TemplateShape } from "../../types/template";

type CompareSetShape = {
  weight: number;
  reps: number;
  weightChange?: number;
  repChange?: number;
};

interface Props {
  previousWorkout: TemplateShape;

  exercise: {
    decreasedSets: SetShape[];
    exerciseName: string;
    increasedSets: SetShape[];
    sets: CompareSetShape[];
  };

  exerciseIndex: number;
}

function getTotalRepsSingleExercise(exerciseSets: SetShape[]) {
  return exerciseSets.reduce((total, set) => (total += set.reps), 0);
}

export default function ExerciseTableHeader({
  exercise,
  previousWorkout,
  exerciseIndex,
}: Props) {
  const { sets } = exercise;
  return (
    <Group>
      <ExerciseLink exerciseName={exercise.exerciseName} size="xl" />
      <Box>
        <Text span>
          Volume:{" "}
          {getTotalVolumeForExercise(
            exercise.sets.concat(exercise.increasedSets)
          )}{" "}
          Lbs{" "}
        </Text>
        <Text span>
          {CompareText(
            getTotalVolumeForExercise(
              exercise.sets.concat(exercise.increasedSets)
            ) -
              getTotalVolumeForExercise(
                previousWorkout.exercises[exerciseIndex].sets
              )
          )}
        </Text>
      </Box>
      <Box>
        <Text span>
          Reps:{" "}
          {getTotalRepsSingleExercise(sets) +
            getTotalRepsSingleExercise(exercise.increasedSets)}
        </Text>
        <Text span>
          {CompareText(
            getTotalRepsSingleExercise(sets) +
              getTotalRepsSingleExercise(exercise.increasedSets) -
              getTotalRepsSingleExercise(
                previousWorkout.exercises[exerciseIndex].sets
              )
          )}
        </Text>
      </Box>
      <Text>
        Sets: {exercise.sets.length + exercise.increasedSets.length}{" "}
        {exercise.increasedSets.length
          ? CompareText(exercise.increasedSets.length)
          : null}
        {exercise.decreasedSets.length
          ? CompareText(-exercise.decreasedSets.length)
          : null}
      </Text>
    </Group>
  );
}
