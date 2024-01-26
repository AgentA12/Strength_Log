import {
  Title,
  Stack,
  Paper,
  Container,
  useMantineTheme,
  Loader,
  Text,
  Group,
  Select,
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
      <Stack gap={0} mb={120}>
        <Title order={3} fw={600}>
          {formatDate(parseInt(workoutState.formerWorkout.createdAt))}
        </Title>

        <Stack gap={0}>
          <Title order={4} tt="capitalize">
            {templateName}
          </Title>
          <Group gap={5}>
            <Text span>Compared to: </Text>
            <Text span fw={500} c={primaryColor} size="lg">
              {compareTo === "previous workout"
                ? formatDate(parseInt(previousWorkout.createdAt))
                : "Original Template"}
            </Text>
          </Group>
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
          <Group mt={12}>
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
          </Group>
          {workout.comparedWorkout.map((exercise: any, i: number) => (
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
                previousWorkout={workout.previousWorkout}
                exerciseIndex={i}
              />
              <CompareExerciseTable exercise={exercise} />
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
