import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/userInfo";
import {
  Group,
  Select,
  Text,
  Pagination,
  Container,
  Loader,
} from "@mantine/core";
import DividerTitle from "../DividerTitle";
import { useQuery } from "@apollo/client";
import {
  GET_PROGRESS_BY_DATE,
  GET_TEMPLATES,
} from "../../utils/graphql/queries";
import { WorkoutSection } from "./index";
import { Workout } from "../../types/workout";
import { TemplateShape } from "../../types/template";

// "chunk" is used to create a two dimensional array for pagination
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export default function RecentProgress() {
  const limitPerPage = 12;
  const userInfo = useContext(UserContext);
  const userID = userInfo?.data._id;

  const { data, loading, error } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userID },
  });

  const {
    data: templates,
    loading: templateLoading,
    error: templateError,
  } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [activePage, setPage] = useState(1);
  const [workouts, setWorkouts] = useState<Workout[][]>();

  // can't use the data returned from query because filtering pages on client
  useEffect(() => {
    if (data) {
      const paginatedWorkouts = chunk<Workout>(
        data.getProgressByDate,
        limitPerPage
      );
      setWorkouts(paginatedWorkouts);
    }
  }, [loading]);

  if (loading || templateLoading) return <Loader />;

  function filterWorkoutsByDate(sortBy: string | null) {
    let bufferData = workouts?.flat();

    if (sortBy && bufferData) {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) =>
            sortBy === "oldest first"
              ? a.createdAt - b.createdAt
              : b.createdAt - a.createdAt
          ),
          limitPerPage
        )
      );
    }
    setPage(1);
  }

  function filterWorkoutsByTemplates(templateValue: string | null) {
    const bufferData = [...data.getProgressByDate];

    if (templateValue != null && bufferData) {
      setWorkouts(
        chunk(
          templateValue === "all templates"
            ? bufferData.sort((a, b) => b.createdAt - a.createdAt)
            : bufferData
                .filter((workout) => workout.template?._id === templateValue)
                .sort((a, b) => b.createdAt - a.createdAt),
          limitPerPage
        )
      );
    }

    setPage(1);
  }

  if (error) return <Text c="red">{error.message}</Text>;
  if (templateError) return <Text>{templateError.message}</Text>;

  // formatting template data for select template input
  const templateSelectData = templates
    ? templates.getTemplates.map((temp: TemplateShape) => {
        return { label: temp.templateName, value: temp._id };
      })
    : null;

  templateSelectData.unshift({
    value: "all templates",
    label: "all templates",
  });

  if (workouts)
    return (
      <Container fluid mt={12}>
        <DividerTitle name="Recents" />

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
            label={<Text c="dimmed">By templates</Text>}
            defaultValue={"all templates"}
            data={[...templateSelectData]}
            onChange={filterWorkoutsByTemplates}
          />
        </Group>

        {workouts.length ? (
          workouts[activePage - 1].map((workout: Workout) => (
            <WorkoutSection key={workout._id} workout={workout} />
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
