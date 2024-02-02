import { useEffect, useState } from "react";
import { useUserInfo } from "../contexts/userInfo";
import {
  Group,
  Select,
  Text,
  Pagination,
  Checkbox,
  Center,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPLETED_EXERCISES } from "../utils/graphql/queries";
import { chunk } from "../utils/helpers/functions";
import { Exercise } from "../types/workoutState";
import ExerciseList from "./ExerciseList";
import { TemplateShape } from "../types/template";

const limitPerPage = 8;

interface Props {
  activeExercise: string;
}

interface ExerciseCompleted extends Exercise {
  savedOn: string;
  belongsTo: TemplateShape;
}

export default function RecentExerciseProgress({ activeExercise }: Props) {
  const userInfo = useUserInfo();
  const userID = userInfo?.data._id;

  const { data, loading, error } = useQuery(GET_ALL_COMPLETED_EXERCISES, {
    variables: {
      userID: userID,
    },
  });

  const [activePage, setPage] = useState(1);
  const [exercises, setExercises] = useState<ExerciseCompleted[][]>();
  const [sortBy, setSortBy] = useState("newest first");
  const [openAll, setOpenAll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<null | string[]>(null);

  useEffect(() => {
    if (data && activeExercise) {
      filterExercisesByExerciseName(activeExercise);
    }
  }, [data, activeExercise]);

  function filterWorkoutsByDate(sortBy: string) {
    let bufferData = exercises?.flat();

    if (bufferData) {
      setExercises(
        chunk(
          bufferData.sort((a, b) =>
            sortBy === "oldest first"
              ? parseInt(a.savedOn) - parseInt(b.savedOn)
              : parseInt(b.savedOn) - parseInt(a.savedOn)
          ),
          limitPerPage
        )
      );
    }
    setSortBy(sortBy);
    setPage(1);
  }

  function filterExercisesByExerciseName(selectName: string) {
    const bufferData = [...data.getAllCompletedExercises];

    if (bufferData) {
      setExercises(
        chunk(
          selectName === "all exercises"
            ? bufferData.sort((a, b) =>
                sortBy === "oldest first"
                  ? parseInt(a.savedOn) - parseInt(b.savedOn)
                  : parseInt(b.savedOn) - parseInt(a.savedOn)
              )
            : bufferData
                .filter(
                  (exercise) => exercise.exercise.exerciseName === selectName
                )
                .sort((a, b) =>
                  sortBy === "oldest first"
                    ? parseInt(a.savedOn) - parseInt(b.savedOn)
                    : parseInt(b.savedOn) - parseInt(a.savedOn)
                ),
          limitPerPage
        )
      );
    }

    setPage(1);
  }

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

  if (loading) return "loading";

  if (exercises) exercises[activePage - 1];

  return (
    <>
      <Group justify="center" mb={10}>
        <Select
          allowDeselect={false}
          value={sortBy}
          data={["newest first", "oldest first"]}
          onChange={(value) => filterWorkoutsByDate(value as string)}
        />

        <Checkbox
          onChange={() => setOpenAll(!openAll)}
          checked={openAll}
          label="Open All"
        />
      </Group>

      <ExerciseList
        exercises={exercises as ExerciseCompleted[][]}
        activePage={activePage}
        openAll={openAll}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Center>
        <Pagination
          my={10}
          total={exercises ? exercises.length : 1}
          value={activePage}
          onChange={(val) => {
            setPage(val), window.scrollTo(0, 0);
          }}
        />
      </Center>
    </>
  );
}
