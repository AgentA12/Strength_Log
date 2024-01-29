import { Flex, Button, Box } from "@mantine/core";
import { motion } from "framer-motion";
import { ExerciseForm } from "./index";
import { SetShape } from "../../types/template";

interface Props {
  open: () => void;
  form: any;
  removeSet: (index: number, i: number) => void;
  addSet: (exerciseIndex: number) => void;
  removeExercise: (index: number) => void;
}

interface Exercise {
  exerciseName: string;
  _id: string;
  restTime: number;
  sets: SetShape[];
}

export default function FormTwo({
  form,
  open,
  removeSet,
  addSet,
  removeExercise,
}: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Flex direction="column">
        <Flex
          align="center"
          direction="column"
          justify="space-around"
          wrap="wrap"
          gap={2}
        >
          <Button onClick={open}>Add Exercise</Button>
        </Flex>
        {form.values.exercises.map(
          (exercise: Exercise, exerciseIndex: number) => (
            <Box maw={475} key={exercise.exerciseName as string}>
              <ExerciseForm
                exerciseIndex={exerciseIndex}
                form={form}
                removeExercise={removeExercise}
                addSet={addSet}
                removeSet={removeSet}
              />
            </Box>
          )
        )}
      </Flex>
    </motion.div>
  );
}
