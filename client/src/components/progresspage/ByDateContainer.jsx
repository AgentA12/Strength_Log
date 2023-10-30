import { v4 as uuidv4 } from "uuid";

import {
  Badge,
  Center,
  Container,
  Divider,
  Loader,
  Stack,
  Table,
  Text,
  createStyles,
  Box,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../../utils/graphql/queries";
import { UserContext } from "../../App";
import { useContext } from "react";
import { getTotalReps, getTotalSets, getTotalVolume } from "../../utils/helpers/functions";

const useStyles = createStyles((theme) => ({
  date: {
    color: theme.colors.brand[4],
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));

export default function ByDateContainer() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const { classes } = useStyles();

  const { data, error, loading } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: _id },
  });

  if (loading)
    return (
      <Center mt={50}>
        <Stack align="center">
          <Loader />
          loading...
        </Stack>
      </Center>
    );

  if (error) return error.message;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Container fluid>
      {data.getProgressByDate.map((progress, i) => (
        <Container key={uuidv4()} size="sm" ml={0} mb={25}>
          {i !== 0 ? <Divider variant="dashed"></Divider> : null}
          <Box>
            <Text className={classes.date} fz={28}>
              {new Date(parseInt(progress.createdAt)).toLocaleDateString(
                "en-us",
                options
              )}
            </Text>
          </Box>
          <Text
            variant="gradient"
            gradient={{ from: "#662D8C", to: " #ED1E79", deg: 90 }}
            fw={900}
            size={30}
            span
            tt="capitalize"
          >
            {progress.template?.templateName}
          </Text>

          <Box>
            <Badge>Total Volume {getTotalVolume(progress.exercises)} Lbs</Badge>{" "}
            <Badge>Total Sets {getTotalSets(progress.exercises)}</Badge>{" "}
            <Badge>Total Reps {getTotalReps(progress.exercises)}</Badge>
            {progress.exercises.map((exercise) => (
              <TableSection key={uuidv4()} exercise={exercise} />
            ))}
          </Box>
        </Container>
      ))}
    </Container>
  );
}

function TableSection({ exercise }) {
  const rows = exercise.sets.map((set, index) => (
    <tr key={set.weight + index}>
      <td>{index + 1}</td>
      <td>{set.reps}</td>
      <td>{set.weight}</td>
    </tr>
  ));

  return (
    <>
      <Text mt={5} fz={20} sx={(theme) => ({ color: theme.colors.brand[4] })}>
        {exercise.exercise.exerciseName}
      </Text>

      <Table>
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
