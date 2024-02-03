import {
  Title,
  Stack,
  Paper,
  Container,
  useMantineTheme,
  Text,
  Group,
  Select,
  Flex,
  Box,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { TotalStatDisplay } from "../progresspage/index";
import { ExerciseTableHeader, CompareExerciseTable } from "./index";
import {
  getTotalReps,
  getTotalSets,
  getTotalVolume,
  compareWorkouts,
  formatDate,
} from "../../utils/helpers/functions";
import { CompareWorkout } from "../../types/compareWorkout";

interface Props {
  workoutState: CompareWorkout;
  compareTo: "original template" | "previous workout";
  setCompareTo: React.Dispatch<
    React.SetStateAction<"original template" | "previous workout">
  >;
}

export default function CompareWorkoutsContainer({
  workoutState,
  setCompareTo,
  compareTo,
}: Props) {
  const { primaryColor } = useMantineTheme();

  const selectedWorkout = workoutState.formerWorkout;
  const previousWorkout = workoutState.latterWorkout;
  const originalTemplate = workoutState.originalTemplate;
  const templateName = selectedWorkout.template.templateName;

  let workout: any;

  if (workoutState.hasLatterWorkout === false) {
    workout = compareWorkouts(selectedWorkout, originalTemplate);
  } else {
    compareTo === "original template"
      ? (workout = compareWorkouts(selectedWorkout, originalTemplate))
      : (workout = compareWorkouts(selectedWorkout, previousWorkout));
  }

  return (
    <Container fluid mt={12}>
      <Flex
        direction="column"
        align={{ base: "center", md: "start" }}
        gap={0}
        mb={100}
      >
        <Title order={3} fw={600}>
          {formatDate(parseInt(workoutState.formerWorkout.createdAt))}
        </Title>

        <Title order={4} tt="capitalize">
          {templateName}
        </Title>

        <Text span>Compared to: </Text>
        <Text span fw={500} c={`${primaryColor}.6`} size="lg">
          {compareTo === "previous workout"
            ? formatDate(parseInt(previousWorkout.createdAt))
            : "Original Template"}
        </Text>

        <Select
          allowDeselect={false}
          my={5}
          description="Compare to"
          w={"fit-content"}
          defaultValue={"original template"}
          data={["previous workout", "original template"]}
          value={compareTo}
          onChange={(value) =>
            setCompareTo(value as "original template" | "previous workout")
          }
          disabled={!workoutState.hasLatterWorkout}
        />
        <Flex
          wrap="wrap"
          justify={{ base: "center", md: "start" }}
          gap={18}
          mt={12}
        >
          {compareTo === "original template" ||
          workoutState.hasLatterWorkout === false ? (
            <>
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
              />
              <TotalStatDisplay
                diff={
                  getTotalSets(selectedWorkout.exercises) -
                  getTotalSets(originalTemplate.exercises)
                }
                value={getTotalSets(selectedWorkout.exercises)}
                title={"Total Sets"}
                previousValue={getTotalSets(originalTemplate.exercises)}
              />
            </>
          ) : (
            <>
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
              />
              <TotalStatDisplay
                diff={
                  getTotalSets(selectedWorkout.exercises) -
                  getTotalSets(previousWorkout.exercises)
                }
                value={getTotalSets(selectedWorkout.exercises)}
                title={"Total Sets"}
                previousValue={getTotalSets(previousWorkout.exercises)}
              />
            </>
          )}
        </Flex>
        {workout.comparedWorkout.map((exercise: any, i: number) => (
          <Paper
            miw={300}
            w={"75%"}
            shadow="xs"
            p="lg"
            withBorder
            key={uuidv4()}
            mx={12}
            my={20}
          >
            <ExerciseTableHeader
              exercise={exercise}
              previousWorkout={workout.previousWorkout}
              exerciseIndex={i}
            />
            <CompareExerciseTable exercise={exercise} />
          </Paper>
        ))}
      </Flex>
    </Container>
  );
}
