import { motion } from "framer-motion";
import { useMantineTheme, Stack, Text } from "@mantine/core";
import { SetShape } from "../../types/template";

interface Props {
  form: any;
}

interface Exercise {
  exerciseName: string;
  _id: string;
  restTime: number;
  sets: SetShape[];
}

export default function ConfirmFrom({ form }: Props) {
  const { primaryColor } = useMantineTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Stack align="center" gap={5}>
        <Text size="xxl" fw={700} tt="capitalize">
          {form.values.templateName}
        </Text>
        <Text size="md">
          {form.values.templateNotes.trim()
            ? form.values.templateNotes
            : "No notes"}
        </Text>

        {form.values.exercises.map((exercise: Exercise) => (
          <Stack
            gap={0}
            justify="center"
            align="center"
            key={exercise._id as string}
          >
            <Text size="xl" tt="capitalize" fw={500} c={`${primaryColor}.5`}>
              {exercise.exerciseName}
            </Text>
            <Text>{exercise.sets.length} Set</Text>
            <Text c="dimmed" fw={300}>
              Rest: {exercise.restTime}
            </Text>

            {exercise.sets.map((set: SetShape) => (
              <Text c="dimmed">
                {set.reps} x {set.weight} Lbs
              </Text>
            ))}
          </Stack>
        ))}
      </Stack>
    </motion.div>
  );
}
