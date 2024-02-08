import classes from "./css/exercisecard.module.css";
import { Group, Card, Text, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WorkoutModal } from "./index";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ExerciseShape } from "../../types/template";
import { WorkoutState } from "../../types/workoutState";

interface Exercise extends ExerciseShape {
  completed: boolean;
}

interface Props {
  exercise: Exercise;
  workoutState: WorkoutState;
  handleExerciseComplete: (exerciseIndex: number) => void;
  handleChange: (
    value: number,
    exerciseIndex: number,
    name: "reps" | 'weight',
    setIndex: number
  ) => void;
  exerciseIndex: number;
  addSet: (
    exercise: ExerciseShape,
    exerciseIndex: number,
    setIsResting: React.Dispatch<React.SetStateAction<boolean>>,
    setSetDone: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

export default function ExerciseCard({
  exercise,
  workoutState,
  handleExerciseComplete,
  handleChange,
  exerciseIndex,
  addSet,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return exercise.completed ? (
    <Card
      p="md"
      withBorder
      radius="md"
      classNames={classes}
      c="green.4"
      key={exercise.exercise._id}
    >
      <Flex mb={5} justify="space-between">
        <Text tt="uppercase" fw={700} fz="lg">
          {exercise.exercise.exerciseName}
        </Text>

        <AiOutlineCheckCircle size={24} />
      </Flex>
      <Text>{`${exercise.sets.length} Set${
        exercise.sets.length != 1 ? "s" : ""
      } complete`}</Text>
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

      <WorkoutModal
        exerciseIndex={exerciseIndex}
        opened={opened}
        close={close}
        exercise={exercise}
        templateName={workoutState.templateName}
        handleChange={handleChange}
        handleExerciseComplete={handleExerciseComplete}
        addSet={addSet}
      />
    </>
  );
}
