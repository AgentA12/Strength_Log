import {
  Container,
  Table,
  NumberInput,
  Flex,
  Button,
  Group,
} from "@mantine/core";
import { ExerciseLink } from "../progresspage/index";
import { TemplateShape } from "../../types/template";

interface Props {
  setTemplateState: (templateState: TemplateShape) => void;
  templateState: TemplateShape;
}

export default function WorkoutState(props: Props) {
  const { setTemplateState, templateState } = props;

  function handleChange(
    { target }: { target: { name: string; value: string } },
    exerciseIndex: number,
    setIndex: number
  ) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[exerciseIndex].sets[setIndex][target.name] = target.value;

    setTemplateState({ ...data });
  }

  function addSet(exerciseIndex: number) {
    const templateStateCopy = JSON.parse(JSON.stringify(templateState));

    const lastSetIndex =
      templateStateCopy.exercises[exerciseIndex].sets.length - 1;

    const setToAdd =
      templateStateCopy.exercises[exerciseIndex].sets[lastSetIndex];

    templateStateCopy.exercises[exerciseIndex].sets.push(setToAdd);

    setTemplateState({ ...templateStateCopy });
  }

  function removeSet(exerciseIndex: number) {
    const templateStateCopy = JSON.parse(JSON.stringify(templateState));

    templateStateCopy.exercises[exerciseIndex].sets.pop();

    setTemplateState({ ...templateStateCopy });
  }
  return templateState.exercises.map((exercise, exerciseIndex) => (
    <Container mb={10} key={exercise.exercise._id}>
      <Flex mt={10} justify="space-between" align="center">
        <ExerciseLink size="xl" exerciseName={exercise.exercise.exerciseName} />
      </Flex>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Set</Table.Th>
            <Table.Th>Reps</Table.Th>
            <Table.Th>Weight</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {exercise.sets.map((set, setIndex) => (
            <Table.Tr key={set._id}>
              <Table.Td>{setIndex + 1}</Table.Td>
              <Table.Td>
                <NumberInput
                  data-autofocus
                  w={75}
                  min={1}
                  max={99}
                  value={set.reps}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "reps", value: value as string } },
                      exerciseIndex,
                      setIndex
                    )
                  }
                />
              </Table.Td>
              <Table.Td>
                <NumberInput
                  w={75}
                  step={5}
                  min={5}
                  max={995}
                  value={set.weight}
                  onChange={(value: string | number) =>
                    handleChange(
                      { target: { name: "weight", value: value as string } },
                      exerciseIndex,
                      setIndex
                    )
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group my={5} justify="space-between">
        <Button size="xs" onClick={() => addSet(exerciseIndex)}>
          Add Set
        </Button>{" "}
        <Button
          disabled={exercise.sets.length === 1}
          size="xs"
          color="red"
          onClick={() => removeSet(exerciseIndex)}
        >
          Remove Set
        </Button>
      </Group>
    </Container>
  ));
}
