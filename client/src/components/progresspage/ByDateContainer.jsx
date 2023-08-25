import {
  Container,
  Divider,
  Flex,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import TableSelection from "../workoutpage/Table";
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

export default function ByDateContainer({}) {
  const {
    data: { _id },
  } = useContext(UserContext);

  const { classes } = useStyles();

  const { data, error, loading } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: _id },
  });

  if (loading) return "loading...";
  if (error) return error.message;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <>
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
            <TableSection exercise={exercise} />
          ))}
        </Container>
      ))}
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
