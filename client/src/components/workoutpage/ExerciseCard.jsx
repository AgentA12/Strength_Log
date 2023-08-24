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
        w={275}
        key={exercise.exercise.exerciseName}
      >
        <Text tt="uppercase" fw={700} fz="lg">
          {exercise.exercise.exerciseName}
        </Text>
        <Group position="apart" align="center" mt={10}>
          <Text c="dimmed" fz="sm" mt="md">
            {`${exercise.sets.length} sets`}
          </Text>
          <Button size="xs" onClick={startExercise}>
            Start
          </Button>
        </Group>
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
