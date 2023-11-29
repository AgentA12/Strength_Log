import classes from "./exerciseCard.module.css";
import { Group, Card, Text, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WorkoutModal } from "./index";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function ExerciseCard({
  exercise,
  template,
  exerciseComplete,
  handleChange,
  exerciseIndex,
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return exercise.completed ? (
    <Card
      p="md"
      withBorder
      radius="md"
      className={classes.exerciseCard}
      c="dimmed"
      key={exercise.exercise._id}
    >
      <Flex mb={5} justify="space-between">
        <Text tt="uppercase" fw={700} fz="lg">
          {exercise.exercise.exerciseName}
        </Text>

        <AiOutlineCheckCircle size={28} />
      </Flex>
      <Text>{`${exercise.sets.length} Set${
        exercise.sets.length != 1 ? "s" : ""
      } completed`}</Text>
    </Card>
  ) : (
    <>
      <Card
        shadow="lg"
        withBorder
        p="md"
        radius="md"
        className={classes.exerciseCard}
        key={exercise.exercise.exerciseName}
      >
        <Text tt="uppercase" fw={700} fz="lg">
          {exercise.exercise.exerciseName}
        </Text>
        <Group justify="space-between" align="center" mt={10}>
          <Text c="dimmed" fz="sm">
            {`${exercise.sets.length} Set${
              exercise.sets.length != 1 ? "s" : ""
            }`}
          </Text>
          <Button size="xs" onClick={open}>
            Start
          </Button>
        </Group>
      </Card>
      {open ? (
        <WorkoutModal
          exerciseIndex={exerciseIndex}
          opened={opened}
          close={close}
          exercise={exercise}
          templateName={template.templateName}
          handleChange={handleChange}
          exerciseComplete={exerciseComplete}
        />
      ) : null}
    </>
  );
}
