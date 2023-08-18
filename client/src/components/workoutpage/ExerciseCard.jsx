import { createStyles, Group, Card, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WorkoutModal } from "./index";

const useStyles = createStyles((theme) => ({
  cardCompleted: {},
}));

export default function ExerciseCard({ exercise, template }) {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  function startExercise() {
    open();
  }

  return (
    <>
      <Card
        withBorder
        p="md"
        className={classes.cardCompleted}
        radius="md"
        w={345}
        key={exercise.exerciseName}
      >
        <Group position="apart">
          <Text tt="uppercase" fw={700} fz="lg">
            {exercise.exerciseName}
          </Text>
          <Button onClick={startExercise}>Start</Button>
        </Group>
        <Text fw={700} fz="xl">
          {exercise.weight} Lbs
        </Text>
        <Text c="dimmed" fz="sm" mt="md">
          {`${exercise.sets} sets x ${exercise.reps} reps`}
        </Text>
      </Card>
      <WorkoutModal
        opened={opened}
        close={close}
        exercise={exercise}
        templateName={template.templateName}
      />
    </>
  );
}
