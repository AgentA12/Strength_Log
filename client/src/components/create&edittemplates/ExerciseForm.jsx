import { IoMdRemove } from "react-icons/io";
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
  handleChange,
  exerciseIndex,
  form,
  removeExercise,
  addSet,
  removeSet,
}) {
  return (
    <Card withBorder my={10}>
      <Group position="apart">
        <Title
          tt="capitalize"
          order={2}
          sx={(theme) => ({ color: theme.colors.brand[4] })}
        >
          {form.values.exercises[exerciseIndex].exerciseName
            ? form.values.exercises[exerciseIndex].exerciseName
            : form.values.exercises[exerciseIndex].exerciseName}
        </Title>
        <NumberInput
          size="xs"
          label="Rest time"
          suffix="(s)"
          min={0}
          max={999}
          w={100}
          value={
            form.getInputProps(`exercises.${exerciseIndex}.restTime`).value
          }
          onChange={(value) =>
            handleChange(exerciseIndex, {
              target: {
                name: "restTime",
                value: value,
              },
            })
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
                onChange={(value) =>
                  handleChange(exerciseIndex, {
                    target: { name: "reps", value: value, setIndex: setIndex },
                  })
                }
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
                onChange={(value) =>
                  handleChange(exerciseIndex, {
                    target: {
                      name: "weight",
                      value: value,
                      setIndex: setIndex,
                    },
                  })
                }
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

      <Group position="apart">
        <Button onClick={() => addSet(exerciseIndex)}>Add Set</Button>
        <Button
          mt={10}
          onClick={(event) => removeExercise(event, exerciseIndex)}
          rightIcon={<IoMdRemove color="" />}
          color="red"
        >
          Remove Exercise
        </Button>
      </Group>
    </Card>
  );
}
