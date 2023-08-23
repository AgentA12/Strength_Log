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
  index,
  formState,
  removeExercise,
  addSet,
  removeSet,
}) {
  return (
    <Card withBorder my={10}>
      <Group position="apart">
        <Title order={2} sx={(theme) => ({ color: theme.colors.cyan[5] })}>
          {formState.exercises[index].exerciseName.toUpperCase()}
        </Title>
        <NumberInput
          label="Rest time"
          radius="xs"
          description="In Seconds"
          w={100}
          defaultValue={180}
        />
      </Group>
      <List withPadding mb={10} listStyleType="none">
        {formState.exercises[index].sets.map((e, i) => (
          <List.Item mb={5} key={i}>
            <Group>
              <Text fz={20} fw="bold">
                Set {i + 1}
              </Text>
              <Button variant="outline" onClick={() => removeSet(index, i)}>
                Remove Set
              </Button>
            </Group>
            <Group>
              <NumberInput
                label="Reps"
                onChange={(value) =>
                  handleChange(index, {
                    target: { name: "reps", value: value, setIndex: i },
                  })
                }
                value={parseInt(formState.exercises[index].sets[i].reps)}
              />
              <NumberInput
                step={5}
                label="Weight (Lbs)"
                onChange={(value) =>
                  handleChange(index, {
                    target: { name: "weight", value: value, setIndex: i },
                  })
                }
                value={parseInt(formState.exercises[index].sets[i].weight)}
              />
            </Group>
          </List.Item>
        ))}
      </List>

      <Group position="apart">
        <Button variant="outline" onClick={() => addSet(index)}>
          Add Set
        </Button>
        <Button
          mt={10}
          onClick={(event) => removeExercise(event, index)}
          rightIcon={<IoMdRemove color="" />}
          variant="outline"
          color="red"
        >
          Remove Exercise
        </Button>
      </Group>
    </Card>
  );
}
