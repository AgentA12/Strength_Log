import { Text, Group, Paper } from "@mantine/core";
import CompareText from "./CompareText";
import {
  getTotalVolumeForExercise,
  getTotalReps,
} from "../../utils/helpers/functions";

export default function ExerciseTableHeader({
  exercise,
  workout,
  exerciseIndex,
}) {
  return (
    <Group>
      <Text
        style={{ cursor: "pointer" }}
        td="underline"
        size="xl"
        tt="capitalize"
        fw={700}
      >
        {exercise.exerciseName}
      </Text>
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
