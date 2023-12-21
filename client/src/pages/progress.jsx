import classesTwo from "./progressPage.module.css";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { UserContext } from "../../src/app";
import { useContext } from "react";
import {
  Pagination,
  Container,
  Divider,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  Table,
  Box,
} from "@mantine/core";
import { ByChartContainer } from "../components/progresspage/index";
import classes from "./dashboard.module.css";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../utils/graphql/queries";
import { getTotalVolume } from "../utils/helpers/functions";

function ExerciseTable({ exercise }) {
  const rows = exercise.sets.map((set, i) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{set.reps}</Table.Td>
      <Table.Td>{set.weight}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Text>{exercise.exercise.exerciseName}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Set</Table.Th>
            <Table.Th>Rep</Table.Th>
            <Table.Th>Weight</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <Tabs defaultValue="recents">
        <Tabs.List>
          <Tabs.Tab value="recents">Recents</Tabs.Tab>

          <Tabs.Tab value="templates">Templates</Tabs.Tab>
          <Tabs.Tab value="exercises">Exercises</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="recents">
          <RecentProgressPage />
        </Tabs.Panel>

        <Tabs.Panel value="templates">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="exercises">Messages tab content</Tabs.Panel>
      </Tabs>
      {/* <ByChartContainer /> */}
    </Container>
  );
}

function RecentProgressPage() {
  let limitPerPage = 12;
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userID },
  });

  const [workouts, setWorkouts] = useState(null);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    if (data) setWorkouts(chunk(data.getProgressByDate, limitPerPage));
  }, [data]);

  if (error) return <Text>{error.message}</Text>;

  if (loading) return "loading...";

  function filterWorkouts(sortBy) {
    let bufferData = [...workouts].flat();

    if (sortBy === "oldest first") {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) => a.createdAt - b.createdAt),
          limitPerPage
        )
      );
    } else {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) => b.createdAt - a.createdAt),
          limitPerPage
        )
      );
    }

    setPage(1);
  }

  if (workouts)
    return (
      <Container fluid mt={12}>
        <Group>
          <Select
            mb={10}
            label={<Text c="dimmed">Sort by</Text>}
            defaultValue="newest first"
            data={["newest first", "oldest first"]}
            onChange={filterWorkouts}
          />
        </Group>
        <Pagination
          total={workouts.length}
          value={activePage}
          onChange={setPage}
          withEdges
        />

        {workouts[activePage - 1].map((workout, i) => (
          <React.Fragment key={uuidv4()}>
            <Text span className={classesTwo.dateLink}>
              {new Date(parseInt(workout.createdAt)).toLocaleDateString()}
            </Text>
            <Text span>
              {workout.template
                ? workout.template.templateName.toString()
                : "Deleted Template"}
            </Text>

            <Stack gap={0}>
              <Text>Total Volume</Text>
              <Text>{getTotalVolume(workout.exercises)}</Text>
            </Stack>

            {workout.exercises.map((exercise) => (
              <Box key={uuidv4()} style={{ maxWidth: "1000px" }}>
                <ExerciseTable exercise={exercise} />
              </Box>
            ))}
            {workouts[activePage - 1].length - 1 != i && (
              <Divider size="xs" color="brand" my={12} />
            )}
          </React.Fragment>
        ))}
      </Container>
    );
}

function chunk(array, size) {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
