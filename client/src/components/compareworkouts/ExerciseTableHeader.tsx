import { Text, Group, Paper } from "@mantine/core";
import CompareText from "./CompareText";
import {
  getTotalVolumeForExercise,
  getTotalReps,
} from "../../utils/helpers/functions";
import ExerciseLink from "../progresspage/ExerciseLink";
import {
  ExerciseDetailsShape,
  ExerciseShape,
  SetShape,
} from "../../types/template";

interface Props {
  workout: {
    compareWorkout: any[];
    previousWorkout: any[];
    selectedWorkout: any[];
  };

  exercise: {
    decreasedSets: any[];
    exerciseName: string;
    increasedSets: any[];
    sets: SetShape[];
  };

  exerciseIndex: number;
}

export default function ExerciseTableHeader({
  exercise,
  workout,
  exerciseIndex,
}: Props) {
  console.log(workout, exercise);
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
                workout.previousWorkout.exercises[exerciseIndex].sets
              )
          )}
        </Text>
      </Paper>
      <Paper>
        <Text span>
          Reps:{" "}
          {getTotalReps(exercise) +
            getTotalReps(
              exercise.increasedSets ? { sets: exercise.increasedSets } : null
            )}{" "}
        </Text>
        <Text span>
          {CompareText(
            getTotalReps(exercise) +
              getTotalReps({
                sets: exercise.increasedSets,
              }) -
              getTotalReps(workout.previousWorkout.exercises[exerciseIndex])
          )}
        </Text>
      </Paper>
      <Text>
        Sets: {exercise.sets.length}{" "}
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
