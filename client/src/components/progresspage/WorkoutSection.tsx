import classes from "./workoutSection.module.css";
import { getTotalVolume } from "../../utils/helpers/functions";
import { Link } from "react-router-dom";
import { ExerciseTable } from "./index";
import { Box, Paper, Stack, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

export default function SingleWorkout({ workout, setActiveTab }) {
  const DateLinkProps = {
    className: classes.dateLink,
    component: Link,
    to: `/progress/${workout._id}`,
    state: { workoutID: workout._id },
  };

  return (
    <Paper
      maw={900}
      radius="lg"
      shadow="xs"
      p="xl"
      m={12}
      withBorder
      key={uuidv4()}
    >
      <Stack justify="center" align="center" gap={0}>
        {workout.template ? (
          <Text {...DateLinkProps}>
            {new Date(parseInt(workout.createdAt)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        ) : (
          <Text c="dimmed" size="xl">
            {new Date(parseInt(workout.createdAt)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        )}
        {workout.template ? (
          <Text tt="capitalize" fw={700} size="xl">
            {workout.template.templateName.toString()}{" "}
          </Text>
        ) : (
          <Text c="red.6" fw={600} size="xl">
            This template was deleted permanently
          </Text>
        )}
        <Stack align="center" w="fit-content" gap={0}>
          <Text fw={600}>Total Volume</Text>
          <Text>{getTotalVolume(workout.exercises)} Lbs</Text>
        </Stack>
      </Stack>

      {workout.exercises.map((exercise) => (
        <Box key={uuidv4()} style={{ maxWidth: "800px" }}>
          <Text
            style={{ cursor: "pointer" }}
            td="underline"
            size="xl"
            c="teal.4"
            tt="capitalize"
            fw={700}
            mt={10}
            w={"fit-content"}
            component={Link}
            state={{
              activeTab: "exercises",
              exerciseName: exercise.exercise.exerciseName,
            }}
            to={`/Progress`}
            onClick={() => setActiveTab("exercises")}
          >
            {exercise.exercise.exerciseName}
          </Text>
          <ExerciseTable exercise={exercise} />
        </Box>
      ))}
    </Paper>
  );
}
