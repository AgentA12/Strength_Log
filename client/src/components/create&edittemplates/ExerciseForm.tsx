import {
  Card,
  Button,
  Title,
  NumberInput,
  Text,
  Group,
  List,
  useMantineTheme,
} from "@mantine/core";
import { getPrimaryColor } from "../../utils/helpers/functions";

interface Props {
  exerciseIndex: number;
  form: any;
  removeExercise: (event: React.SyntheticEvent, exerciseIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
}

export default function ExerciseForm({
  exerciseIndex,
  form,
  removeExercise,
  addSet,
  removeSet,
}: Props) {
  const exercises = [...form.values.exercises];
  const { primaryColor } = useMantineTheme();

  return (
    <Card withBorder my={10}>
      <Group justify="space-between">
        <Title c={`${primaryColor}.6`} tt="capitalize" order={2}>
          {form.values.exercises[exerciseIndex].exerciseName}
        </Title>
        <NumberInput
          size="xs"
          label="Rest time"
          min={1}
          max={300}
          w={120}
          {...form.getInputProps(`exercises.${exerciseIndex}.restTime`, {
            withFocus: false,
          })}
        />
      </Group>
      <List withPadding listStyleType="none">
        {exercises[exerciseIndex].sets.map(
          (
            set: { weight: number; reps: number; _id: string },
            setIndex: number
          ) => (
            <List.Item mb={14} key={set._id}>
              <Group>
                <Text fz={20} fw="bold">
                  Set {setIndex + 1}
                </Text>
                {setIndex >= 1 && (
                  <Button onClick={() => removeSet(exerciseIndex, setIndex)}>
                    Remove Set
                  </Button>
                )}
              </Group>
              <Group>
                <NumberInput
                  label="Reps"
                  min={1}
                  size="xs"
                  {...form.getInputProps(
                    `exercises.${exerciseIndex}.sets.${setIndex}.reps`,
                    { withFocus: false }
                  )}
                />
                <NumberInput
                  step={5}
                  size="xs"
                  min={1}
                  label="Weight (Lbs)"
                  {...form.getInputProps(
                    `exercises.${exerciseIndex}.sets.${setIndex}.weight`,
                    { withFocus: false }
                  )}
                />
              </Group>
            </List.Item>
          )
        )}
      </List>

      <Group mt={5} justify="left">
        <Button onClick={() => addSet(exerciseIndex)}>Add Set</Button>
        <Button
          color="red"
          onClick={(event) => removeExercise(event, exerciseIndex)}
        >
          Remove Exercise
        </Button>
      </Group>
    </Card>
  );
}
