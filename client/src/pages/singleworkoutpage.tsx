import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  Group,
  Loader,
  Table,
  Stack,
  Text,
  Title,
  Select,
  Paper,
} from "@mantine/core";
import { COMPARE_WORKOUTS } from "../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../app";
import { TotalStatDisplay } from "../components/progresspage/index";
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

  const [compareToOriginal, setCompareToOriginal] = useState(false);

  const { data, error, loading } = useQuery(COMPARE_WORKOUTS, {
    variables: { userID: userID, workoutID: workoutID },
  });

  if (loading) return <Loader />;

  if (error)
    return (
      <Text c="red.6" fw={600}>
        {error.message}
      </Text>
    );

  if (data.compareWorkouts.hasLatterWorkout != true)
    return (
      <Stack gap={0} key={uuidv4()} mb={120}>
        <Title fw={600} >
          {new Date(
            parseInt(data.compareWorkouts.formerWorkout.createdAt)
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Title>

        <Title order={2} tt="capitalize">
          {data.compareWorkouts.formerWorkout.template.templateName.toString()}
        </Title>
        <Text>No previous workouts saved</Text>
      </Stack>
    );

  const selectedWorkout = data.compareWorkouts.formerWorkout;
  const previousWorkout = data.compareWorkouts.latterWorkout;
  const originalTemplate = data.compareWorkouts.originalTemplate;

  const workout = compareToOriginal
    ? compareWorkouts(selectedWorkout, originalTemplate)
    : compareWorkouts(selectedWorkout, previousWorkout);

  return (
    <Stack gap={0} key={uuidv4()} mb={120}>
      <Title fw={600} >
        {new Date(
          parseInt(data.compareWorkouts.formerWorkout.createdAt)
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Title>

      <Stack gap={0}>
        <Title order={2} tt="capitalize">
          {data.compareWorkouts.formerWorkout.template.templateName.toString()}
        </Title>
        <Text fw={300} size="lg">
          Compared to{" "}
          <Text span  td="underline">
            {new Date(
              parseInt(data.compareWorkouts.latterWorkout.createdAt)
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Text>
        <Select
          my={5}
          description="Compare to"
          w={"fit-content"}
          defaultValue={"Previous Workout"}
          data={["Previous Workout", "Original Template"]}
          value={compareToOriginal ? "Original Template" : "Previous Workout"}
          onChange={() => setCompareToOriginal(!compareToOriginal)}
        />

        <Group mt={12}>
          {compareToOriginal ? (
            <>
              {" "}
              <TotalStatDisplay
                diff={
                  getTotalVolume(selectedWorkout.exercises) -
                  getTotalVolume(originalTemplate.exercises)
                }
                value={getTotalVolume(selectedWorkout.exercises)}
                title={"Total Volume"}
                previousValue={getTotalVolume(originalTemplate.exercises)}
                unit={"Lbs"}
              />
              <TotalStatDisplay
                diff={
                  getTotalReps(selectedWorkout.exercises) -
                  getTotalReps(originalTemplate.exercises)
                }
                value={getTotalReps(selectedWorkout.exercises)}
                title={"Total Reps"}
                previousValue={getTotalReps(originalTemplate.exercises)}
                unit={null}
              />
              <TotalStatDisplay
                diff={
                  getTotalSets(selectedWorkout.exercises) -
                  getTotalSets(originalTemplate.exercises)
                }
                value={getTotalSets(selectedWorkout.exercises)}
                title={"Total Sets"}
                previousValue={getTotalSets(originalTemplate.exercises)}
                unit={null}
              />{" "}
            </>
          ) : (
            <>
              {" "}
              <TotalStatDisplay
                diff={
                  getTotalVolume(selectedWorkout.exercises) -
                  getTotalVolume(previousWorkout.exercises)
                }
                value={getTotalVolume(selectedWorkout.exercises)}
                title={"Total Volume"}
                previousValue={getTotalVolume(previousWorkout.exercises)}
                unit={"Lbs"}
              />
              <TotalStatDisplay
                diff={
                  getTotalReps(selectedWorkout.exercises) -
                  getTotalReps(previousWorkout.exercises)
                }
                value={getTotalReps(selectedWorkout.exercises)}
                title={"Total Reps"}
                previousValue={getTotalReps(previousWorkout.exercises)}
                unit={null}
              />
              <TotalStatDisplay
                diff={
                  getTotalSets(selectedWorkout.exercises) -
                  getTotalSets(previousWorkout.exercises)
                }
                value={getTotalSets(selectedWorkout.exercises)}
                title={"Total Sets"}
                previousValue={getTotalSets(previousWorkout.exercises)}
                unit={null}
              />{" "}
            </>
          )}
        </Group>
      </Stack>

      {workout.comparedWorkout.map((exercise, i) => (
        <Paper
          maw={900}
          radius="lg"
          shadow="xs"
          p="md"
          withBorder
          key={uuidv4()}
          mx={12}
          my={20}
          style={{ maxWidth: "900px" }}
        >
          <ExerciseTableHeader
            exercise={exercise}
            workout={workout}
            exerciseIndex={i}
          />
          <CompareExerciseTable exercise={exercise} />
        </Paper>
      ))}
    </Stack>
  );
}

function ExerciseTableHeader({ exercise, workout, exerciseIndex }) {
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
          {getColorForChange(
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
          {getColorForChange(
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
          ? getColorForChange(exercise.increasedSets.length)
          : null}
        {exercise.decreasedSets.length
          ? getColorForChange(-exercise.decreasedSets.length)
          : null}
      </Text>
    </Group>
  );
}

function compareExerciseSets(setsOne, setsTwo) {
  let results = { sets: [], increasedSets: [], decreasedSets: [] };

  if (setsOne.length > setsTwo.length) {
    setsOne.map((set, i) => {
      if (setsTwo[i] != undefined) {
        results.sets.push({
          ...set,
          weightChange: set.weight - setsTwo[i].weight,
          repChange: set.reps - setsTwo[i].reps,
        });
      } else {
        results.increasedSets.push({ ...set });
      }
    });
  } else if (setsOne.length < setsTwo.length) {
    setsTwo.map((set, i) => {
      if (setsOne[i] != undefined) {
        results.sets.push({
          ...setsOne[i],
          weightChange: setsOne[i].weight - set.weight,
          repChange: setsOne[i].reps - set.reps,
        });
      } else {
        results.decreasedSets.push({ ...set });
      }
    });
  } else {
    setsOne.map((set, i) => {
      results.sets.push({
        ...set,
        weightChange: set.weight - setsTwo[i].weight,
        repChange: set.reps - setsTwo[i].reps,
      });
    });
  }
  return { ...results };
}

function compareWorkouts(selectedWorkout, previousWorkout) {
  let result = { comparedWorkout: [], selectedWorkout, previousWorkout };
  selectedWorkout.exercises.map((exercise) => {
    previousWorkout.exercises.map((exerciseTwo) => {
      if (exercise.exercise._id === exerciseTwo.exercise._id) {
        result.comparedWorkout.push({
          exerciseName: exercise.exercise.exerciseName,
          ...compareExerciseSets(exercise.sets, exerciseTwo.sets),
        });
      }
    });
  });

  return result;
}

function CompareExerciseTable({ exercise }) {
  const rows = exercise.sets.map((set, i) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        {set.reps} {set.repChange ? getColorForChange(set.repChange) : null}
      </Table.Td>
      <Table.Td>
        {set.weight}{" "}
        {set.weightChange ? getColorForChange(set.weightChange, "Lbs") : null}
      </Table.Td>
    </Table.Tr>
  ));

  exercise.increasedSets.length
    ? exercise.increasedSets.map((e, i) => {
        rows.push(
          <Table.Tr c="green.6" key={uuidv4()}>
            <Table.Td>{exercise.sets.length + i + 1}</Table.Td>
            <Table.Td>{e.reps}</Table.Td>
            <Table.Td>{e.weight}</Table.Td>
          </Table.Tr>
        );
      })
    : exercise.decreasedSets.length
    ? exercise.decreasedSets.map((e, i) => {
        rows.push(
          <Table.Tr c="red.6" key={uuidv4()}>
            <Table.Td>{exercise.sets.length + i + 1}</Table.Td>
            <Table.Td>{e.reps}</Table.Td>
            <Table.Td>{e.weight}</Table.Td>
          </Table.Tr>
        );
      })
    : null;

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Set</Table.Th>
          <Table.Th>Rep</Table.Th>
          <Table.Th>Weight</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

function getColorForChange(num, unit) {
  if (num > 0) {
    return (
      <Text c="green.6" span>
        {" "}
        +{num} {unit && unit}
      </Text>
    );
  } else if (num < 0) {
    return (
      <Text c="red.6" span>
        {num} {unit && unit}
      </Text>
    );
  }
}
