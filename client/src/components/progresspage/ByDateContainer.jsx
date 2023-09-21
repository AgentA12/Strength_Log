import {
  Badge,
  Center,
  Container,
  Divider,
  Pagination,
  Loader,
  Stack,
  Table,
  Text,
  createStyles,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../../utils/graphql/queries";
import { UserContext } from "../../App";
import { Fragment, useContext } from "react";
import { getTotalVolume } from "../../utils/helpers/functions";

const useStyles = createStyles((theme) => ({
  date: {
    color: theme.colors.brand[4],
    "&:hover": {
      textDecoration: "underline",
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

  let total = Math.floor(data.getProgressByDate.length / 2);

  return (
    <>
      {data.getProgressByDate.map((progress, i) => (
        <Container size="sm" ml={0} mb={25}>
          {i !== 0 ? <Divider variant="dashed"></Divider> : null}
          <Text component={Link} className={classes.date} fz={28}>
            {new Date(parseInt(progress.createdAt)).toLocaleDateString(
              "en-us",
              options
            )}
          </Text>
          <Text fz={25} fw="bolder">
            {progress.template?.templateName}
          </Text>

          {progress.exercises.map((exercise) => (
            <Fragment key={exercise._id}>
              <Badge>Total Volume {getTotalVolume(exercise.sets)} Lbs</Badge>{" "}
              <Badge>Sets {exercise.sets.length}</Badge>{" "}
              <Badge>Reps {getTotalReps(exercise.sets)}</Badge>
              <TableSection exercise={exercise} />
            </Fragment>
          ))}
        </Container>
      ))}

      <Pagination total={total} withEdges />
    </>
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
      <Text my={5} fz={20} sx={(theme) => ({ color: theme.colors.brand[4] })}>
        {exercise.exercise.exerciseName.toUpperCase()}
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
const getTotalReps = (sets) =>
  sets.reduce((total, set) => (total += set.reps), 0);
