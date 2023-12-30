import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../src/app";
import { Group, Select, Text, Pagination, Container } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../utils/graphql/queries";
import { WorkoutSection } from "../components/progresspage/index";

function chunk(array, size) {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...chunk(tail, size)];
}

export default function RecentProgressPage() {
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
  }, [loading]);

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

  if (error) return <Text color="red">{error.message}</Text>;

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

        {workouts[activePage - 1].map((workout) => (
          <WorkoutSection key={workout._id} workout={workout} />
        ))}

        <Pagination
          total={workouts.length}
          value={activePage}
          onChange={(val) => {
            setPage(val), window.scrollTo(0, 0);
          }}
          withEdges
        />
      </Container>
    );
}
