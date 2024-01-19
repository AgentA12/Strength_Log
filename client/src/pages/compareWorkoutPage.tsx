import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  Group,
  Loader,
  Table,
  Stack,
  Text,
  Title,
  Select,
  Paper,
  Divider,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { COMPARE_WORKOUTS } from "../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../contexts/userInfo";
import { TotalStatDisplay } from "../components/progresspage/index";
import { TemplateSelect } from "../components/progresspage/index";
import { v4 as uuidv4 } from "uuid";
import {
  getTotalReps,
  getTotalSets,
  getTotalVolume,
  compareWorkouts,
} from "../utils/helpers/functions";
import {
  ExerciseTableHeader,
  CompareText,
} from "../components/compareworkouts/index";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES, CALENDAR_TIMESTAMPS } from "../utils/graphql/queries";
import { useLocation } from "react-router-dom";
import DividerTitle from "../components/DividerTitle";

type CompareTo = "original template" | "previous workout";

export default function CompareWorkoutPage() {
  const [compareTo, setCompareTo] = useState<CompareTo>("original template");
  const [activeTemplate, setActiveTemplate] = useState<string>("");
  const [workoutState, setWorkoutState] = useState<any>(null);
  const [dateToCompare, setDateToCompare] = useState<null | string>(null);
  const userInfo = useContext(UserContext);

  const { state } = useLocation();

  const userID = userInfo?.data._id;

  const {
    data: templates,
    loading: templateLoading,
    error: templateError,
  } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [fetchWorkouts, { loading, error, data }] = useLazyQuery(
    COMPARE_WORKOUTS,
    {
      variables: {
        userID: userID,
      },
    }
  );

  const { data: cData } = useQuery(CALENDAR_TIMESTAMPS, {
    variables: {
      userId: userID,
      templateName: activeTemplate ? activeTemplate : "hello",
    },
  });

  useEffect(() => {
    if (state?.compareDate) {
      fetchWorkouts({
        variables: {
          userID: userID,
          workoutID: state.compareDate,
        },
      })
        .then(({ data }) => {
          setWorkoutState(data);
          setActiveTemplate(
            data.compareWorkouts.formerWorkout.template.templateName.toString()
          );
          setDateToCompare(data.compareWorkouts.formerWorkout._id);
        })
        .catch((error: Error) => {});
    }
  }, [state]);

  if (templateError)
    return (
      <Text c="red.6" fw={600}>
        {templateError.message}
      </Text>
    );
  if (templateLoading) return <Loader />;

  async function handleFetchWorkout(value: string | null) {
    setDateToCompare(value);
    try {
      const { data } = await fetchWorkouts({ variables: { workoutID: value } });
      if (data) {
        setWorkoutState(data);
      }
    } catch (error) {}
  }

  function handleTemplateSelect(value: string) {
    setActiveTemplate(value);
    setWorkoutState(null);
    setDateToCompare(null);
  }

  return (
    <>
      <DividerTitle name="Compare" />
      <Group>
        <TemplateSelect
          label="Select a template"
          templates={templates ? templates.getTemplates : [""]}
          activeTemplate={activeTemplate}
          setActiveTemplate={(value) => handleTemplateSelect(value as string)}
        />

        {activeTemplate ? (
          <Select
            allowDeselect={false}
            w={"fit-content"}
            data={cData?.calendarTimeStamps.map(
              (stamp: { _id: string; createdAt: string }) => {
                return {
                  label: formatDate(stamp.createdAt),
                  value: stamp._id,
                };
              }
            )}
            value={dateToCompare}
            onChange={handleFetchWorkout}
            label="Date to compare"
          />
        ) : null}
      </Group>
      {workoutState ? (
        <CompareWorkoutsContainer
          data={data}
          loading={loading}
          error={error}
          compareTo={compareTo}
          setCompareTo={setCompareTo}
        />
      ) : null}
    </>
  );
}

function formatDate(date: string | number) {
  const parsedDate = typeof date === "string" ? parseInt(date) : date;

  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  return new Date(parsedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function CompareWorkoutsContainer({
  data,
  setCompareTo,
  compareTo,
  loading,
  error,
}: any) {
  if (loading) return <Loader />;
  if (error) return <Text c="red">{error.message}</Text>;

  const { primaryColor } = useMantineTheme();

  const selectedWorkout = data.compareWorkouts.formerWorkout;
  const previousWorkout = data.compareWorkouts.latterWorkout;
  const originalTemplate = data.compareWorkouts.originalTemplate;
  const templateName = selectedWorkout.template.templateName;

  let workout: any;

  if (data.compareWorkouts.hasLatterWorkout === false) {
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
          {formatDate(data.compareWorkouts.formerWorkout.createdAt)}
        </Title>

        <Stack gap={0}>
          <Title order={4} tt="capitalize">
            {templateName}
          </Title>
          <Group gap={5}>
            <Text span>Compared to: </Text>
            <Text span fw={500} c={primaryColor} size="lg">
              {compareTo === "previous workout"
                ? formatDate(previousWorkout.createdAt)
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
            onChange={setCompareTo}
            disabled={!data.compareWorkouts.hasLatterWorkout}
          />
          <Group mt={12}>
            {compareTo === "original template" ||
            data.compareWorkouts.hasLatterWorkout === false ? (
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
                workout={workout}
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

function CompareExerciseTable({ exercise }: any) {
  const rows = exercise.sets.map((set: any, i: number) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        {set.reps} {set.repChange ? CompareText(set.repChange) : null}
      </Table.Td>
      <Table.Td>
        {set.weight} {set.weightChange ? CompareText(set.weightChange) : null}
      </Table.Td>
    </Table.Tr>
  ));

  exercise.increasedSets.length
    ? exercise.increasedSets.map((e: any, i: number) => {
        rows.push(
          <Table.Tr c="green.6" key={uuidv4()}>
            <Table.Td>{exercise.sets.length + i + 1}</Table.Td>
            <Table.Td>{e.reps}</Table.Td>
            <Table.Td>{e.weight}</Table.Td>
          </Table.Tr>
        );
      })
    : exercise.decreasedSets.length
    ? exercise.decreasedSets.map((e: any, i: any) => {
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
