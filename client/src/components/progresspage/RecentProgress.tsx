import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/userInfo";
import {
  Group,
  Select,
  Text,
  Pagination,
  Container,
  Loader,
  Divider,
  Title,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import {
  GET_PROGRESS_BY_DATE,
  GET_TEMPLATES,
} from "../../utils/graphql/queries";
import { WorkoutSection } from "./index";

// "chunk" is used to create a two dimensional array for pagination
function chunk(array, size) {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...chunk(tail, size)];
}

export default function RecentProgress({ setActiveTab }) {
  let limitPerPage = 10;

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userID },
  });

  // used for select template filter
  const { data: templates } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [activePage, setPage] = useState(1);
  const [workouts, setWorkouts] = useState(null);
  // can't use the data returned from query because filtering pages on client
  useEffect(() => {
    if (data) setWorkouts(chunk(data.getProgressByDate, limitPerPage));
  }, [loading]);

  if (loading) return <Loader />;

  function filterWorkoutsByDate(sortBy) {
    let bufferData = [...workouts].flat();

    if (sortBy === "oldest first") {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) => a.createdAt - b.createdAt),
          limitPerPage
        )
      );
    } else if (sortBy === "newest first") {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) => b.createdAt - a.createdAt),
          limitPerPage
        )
      );
    }
    setPage(1);
  }

  function filterWorkoutsByTemplates(templateId) {
    const bufferData = [...data.getProgressByDate];

    if (templateId === "all templates") {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) => b.createdAt - a.createdAt),
          limitPerPage
        )
      );
    } else {
      setWorkouts(
        chunk(
          bufferData
            .filter((workout) => workout.template?._id === templateId)
            .sort((a, b) => b.createdAt - a.createdAt),
          limitPerPage
        )
      );
    }

    setPage(1);
  }

  if (error) return <Text c="red">{error.message}</Text>;

  // formatting template data for select template input
  const templateSelectData = templates
    ? templates.getTemplates.map((temp) => {
        return { label: temp.templateName, value: temp._id };
      })
    : [{ value: "all templates", label: "all templates" }];

  if (workouts)
    return (
      <Container fluid mt={12}>
        <Divider label={<Title>Recents</Title>} />
        <Group>
          <Select
            mb={10}
            label={<Text c="dimmed">Sort by</Text>}
            defaultValue="newest first"
            data={["newest first", "oldest first"]}
            onChange={filterWorkoutsByDate}
          />
          <Select
            mb={10}
            label={<Text c="dimmed">Templates</Text>}
            defaultValue={"all templates"}
            data={[...templateSelectData]}
            onChange={filterWorkoutsByTemplates}
          />
        </Group>

        {workouts.length ? (
          workouts[activePage - 1].map((workout) => (
            <WorkoutSection
              key={workout._id}
              workout={workout}
              setActiveTab={setActiveTab}
            />
          ))
        ) : (
          <Text>No saved workouts for this template.</Text>
        )}

        <Pagination
          mb={45}
          mt={20}
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
