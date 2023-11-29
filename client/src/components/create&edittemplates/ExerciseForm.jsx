import {
  Card,
  Button,
  Title,
  NumberInput,
  Text,
  Group,
  List,
} from "@mantine/core";

export default function ExerciseForm({
  exerciseIndex,
  form,
  removeExercise,
  addSet,
  removeSet,
}) {
  return (
    <Card withBorder my={10}>
      <Group position="apart">
        <Title tt="capitalize" order={2}>
          {form.values.exercises[exerciseIndex].exerciseName}
        </Title>
        <NumberInput
          size="xs"
          label="Rest time"
          description="In Seconds"
          min={0}
          max={999}
          w={120}
          {...form.getInputProps(`exercises.${exerciseIndex}.restTime`)}
          value={
            form.getInputProps(`exercises.${exerciseIndex}.restTime`).value
          }
        />
      </Group>
      <List withPadding listStyleType="none">
        {form.values.exercises[exerciseIndex].sets.map((_, setIndex) => (
          <List.Item mb={14} key={setIndex}>
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
                  `exercises.${exerciseIndex}.sets.${setIndex}.reps`
                )}
                value={parseInt(
                  form.getInputProps(
                    `exercises.${exerciseIndex}.sets.${setIndex}.reps`
                  ).value
                )}
              />
              <NumberInput
                step={5}
                size="xs"
                min={1}
                label="Weight (Lbs)"
                {...form.getInputProps(
                  `exercises.${exerciseIndex}.sets.${setIndex}.weight`
                )}
                value={parseInt(
                  form.getInputProps(
                    `exercises.${exerciseIndex}.sets.${setIndex}.weight`
                  ).value
                )}
              />
            </Group>
          </List.Item>
        ))}
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
