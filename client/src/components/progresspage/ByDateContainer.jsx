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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../../utils/graphql/queries";
import { UserContext } from "../../App";
import { useContext } from "react";

const useStyles = createStyles((theme) => ({
  date: {
    color: theme.colors.brand[4],
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function getTotalVolume(sets) {
  let TotalVolume = 0;

  sets.map((set) => (TotalVolume += set.weight * set.reps));

  return TotalVolume;
}
export default function ByDateContainer({}) {
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
  if (data) console.log(data);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let total = Math.floor(data.getProgressByDate.length / 2);

  return (
    <Container>
      {data.getProgressByDate.map((progress, i) => (
        <Container mb={25} size="md" key={progress.createdAt + i}>
          {i !== 0 ? <Divider variant="dashed"></Divider> : null}
          <Text component={Link} className={classes.date} fz={28}>
            {new Date(parseInt(progress.createdAt)).toLocaleDateString(
              "en-us",
              options
            )}
          </Text>
          <Text fz={25} fw="bolder">
            {progress.template.templateName}
          </Text>

          {progress.exercises.map((exercise) => (
            <>
              <Badge>Total Volume {getTotalVolume(exercise.sets)} Lbs</Badge>{" "}
              <Badge>Sets {exercise.sets.length}</Badge>{" "}
              <Badge>Reps {getTotalReps(exercise.sets)}</Badge>
              <TableSection exercise={exercise} />{" "}
            </>
          ))}
        </Container>
      ))}
      <Center>
        <Pagination total={total} withEdges />
      </Center>
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
      <Text my={5} fz={20} sx={(theme) => ({ color: theme.colors.brand[7] })}>
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
