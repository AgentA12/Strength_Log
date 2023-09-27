import { IoMdRemove } from "react-icons/io";
import {
  Card,
  Button,
  Title,
  NumberInput,
  Text,
  Group,
  List,
  Divider,
} from "@mantine/core";

export default function ExerciseForm({
  handleChange,
  exerciseIndex,
  formState,
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
          {formState.exercises[exerciseIndex].exercise
            ? formState.exercises[exerciseIndex].exercise.exerciseName
            : formState.exercises[exerciseIndex].exerciseName}
        </Title>
        <NumberInput
          label="Rest time"
          description="In Seconds"
          w={100}
          value={formState.exercises[exerciseIndex].restTime}
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
        {formState.exercises[exerciseIndex].sets.map((_, setIndex) => (
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
                onChange={(value) =>
                  handleChange(exerciseIndex, {
                    target: { name: "reps", value: value, setIndex: setIndex },
                  })
                }
                value={parseInt(
                  formState.exercises[exerciseIndex].sets[setIndex].reps
                )}
              />
              <NumberInput
                step={5}
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
                  formState.exercises[exerciseIndex].sets[setIndex].weight
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
