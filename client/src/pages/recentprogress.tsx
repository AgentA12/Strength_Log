import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userInfo";
import {
  Group,
  Select,
  Text,
  Pagination,
  Container,
  Loader,
  Checkbox,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE, GET_TEMPLATES } from "../utils/graphql/queries";
import { Workout } from "../types/workout";
import { TemplateShape } from "../types/template";
import { chunk } from "../utils/helpers/functions";
import { WorkoutList } from "../components/completedTab";

const limitPerPage = 8;

export default function RecentProgress() {
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
  const [activeTemplate, setActiveTemplate] = useState("all templates");
  const [sortBy, setSortBy] = useState("newest first");
  const [openAll, setOpenAll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<null | string[]>(null);
  // can't use the data returned from query because filtering pages on client
  useEffect(() => {
    if (data) {
      setWorkouts(chunk<Workout>(data.getProgressByDate, limitPerPage));
    }
  }, [data]);

  if (loading || templateLoading) return <Loader />;

  function filterWorkoutsByDate(sortBy: string) {
    let bufferData = workouts?.flat();

    if (bufferData) {
      setWorkouts(
        chunk(
          bufferData.sort((a, b) =>
            sortBy === "oldest first"
              ? parseInt(a.createdAt) - parseInt(b.createdAt)
              : parseInt(b.createdAt) - parseInt(a.createdAt)
          ),
          limitPerPage
        )
      );
    }
    setSortBy(sortBy);
    setPage(1);
  }

  function filterWorkoutsByTemplates(selectName: string) {
    const bufferData = [...data.getProgressByDate];

    if (bufferData) {
      setWorkouts(
        chunk(
          selectName === "all templates"
            ? bufferData.sort((a, b) =>
                sortBy === "oldest first"
                  ? parseInt(a.createdAt) - parseInt(b.createdAt)
                  : parseInt(b.createdAt) - parseInt(a.createdAt)
              )
            : bufferData
                .filter(
                  (workout) => workout.template.templateName === selectName
                )
                .sort((a, b) =>
                  sortBy === "oldest first"
                    ? parseInt(a.createdAt) - parseInt(b.createdAt)
                    : parseInt(b.createdAt) - parseInt(a.createdAt)
                ),
          limitPerPage
        )
      );
    }
    setActiveTemplate(
      templates.getTemplates.find(
        (template: TemplateShape) =>
          template._id === selectName && template.templateName
      )
    );
    setPage(1);
  }

  if (error) return <Text c="red">{error.message}</Text>;
  if (templateError) return <Text>{templateError.message}</Text>;

  // formatting template data for select template input
  const templateSelectData =
    templates &&
    templates.getTemplates.map(
      (template: TemplateShape) => template.templateName
    );

  if (workouts)
    return (
      <Container fluid>
        <Group mb={20}>
          <Select
            allowDeselect={false}
            value={sortBy}
            data={["newest first", "oldest first"]}
            onChange={(value) => filterWorkoutsByDate(value as string)}
          />
          <Select
            allowDeselect={false}
            value={activeTemplate}
            data={["all templates", ...templateSelectData]}
            onChange={(templateName) =>
              filterWorkoutsByTemplates(templateName as string)
            }
          />
          <Checkbox
            onChange={() => setOpenAll(!openAll)}
            checked={openAll}
            label="Open All"
          />
        </Group>

        <WorkoutList
          openAll={openAll}
          activePage={activePage}
          workouts={workouts}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <Pagination
          my={10}
          total={workouts.length}
          value={activePage}
          onChange={(val) => {
            setPage(val), window.scrollTo(0, 0);
          }}
        />
      </Container>
    );
}
