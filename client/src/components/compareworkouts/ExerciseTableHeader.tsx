import { Text, Group, Paper } from "@mantine/core";
import CompareText from "./CompareText";
import {
  getTotalVolumeForExercise,
  getTotalReps,
} from "../../utils/helpers/functions";
import ExerciseLink from "../progresspage/ExerciseLink";
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

  console.log(previousWorkout);
  return (
    <Group>
      <ExerciseLink exerciseName={exercise.exerciseName} size="xl" />
      <Paper>
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
      </Paper>
      <Paper>
        <Text span>
          Reps:{" "}
          {getTotalRepsSingleExercise(sets) +
            getTotalRepsSingleExercise(exercise.increasedSets)}
        </Text>
        <Text span>
          {CompareText(
            getTotalRepsSingleExercise(sets) +
              getTotalRepsSingleExercise(exercise.increasedSets) -
              getTotalReps(previousWorkout.exercises)
          )}
        </Text>
      </Paper>
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
