import { WorkoutList } from "../../components/completedTab/index";
import { useEffect, useState } from "react";
import { Workout } from "../../types/workout";
import { useQuery } from "@apollo/client";
import { GET_PROGRESS_BY_DATE } from "../../utils/graphql/queries";
import { chunk } from "../../utils/helpers/functions";
import { Text, Pagination, Center } from "@mantine/core";

export default function SavedWorkoutList({
  openAll,
  activePage,
  isOpen,
  setIsOpen,
  activeTemplate,
  userID,
  limitPerPage,
  setPage,
  sortBy,
  setSortBy,
}: any) {
  const [workouts, setWorkouts] = useState<Workout[][]>();

  const { data, loading, error } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userID },
  });

  useEffect(() => {
    if (data && activeTemplate) {
      filterWorkoutsByTemplate(activeTemplate);
    }
  }, [data, activeTemplate]);

  function filterWorkoutsByTemplate(selectName: string) {
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

    setPage(1);
  }

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

  if (!workouts) return "Loading..";

  if (error)
    return (
      <>
        <Text size={"xl"} c="red.5">
          Oops! Something went wrong, Try refreshing the page
        </Text>
        <Text size={"xl"} c="red.5">
          {error.message}
        </Text>
      </>
    );
  return (
    <>
      {" "}
      <WorkoutList
        openAll={openAll}
        activePage={activePage}
        workouts={workouts}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Center>
        <Pagination
          my={10}
          total={workouts.length}
          value={activePage}
          onChange={(val: number) => {
            setPage(val), window.scrollTo(0, 0);
          }}
        />
      </Center>
    </>
  );
}
