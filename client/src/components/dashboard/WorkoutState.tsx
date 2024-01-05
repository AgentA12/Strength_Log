import {
  Container,
  Text,
  Table,
  NumberInput,
  Flex,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { ExerciseLink } from "../progresspage/ExerciseLink";

export default function WorkoutState({ setTemplateState, templateState }) {

  function handleChange({ target }, exerciseIndex, setIndex) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[exerciseIndex].sets[setIndex][target.name] = parseInt(
      target.value
    );

    setTemplateState({ ...data });
  }

  const Tables = templateState.exercises.map((exercise, exerciseIndex) => (
    <Container mb={10} key={uuidv4()}>
      <Flex mt={10} justify="space-between" align="center">
       <ExerciseLink exerciseName={exercise.exercise.exerciseName} />
        {exercise.restTime ? <Text fz={13} fw="normal" c="dimmed">
          Rest: {exercise.restTime} seconds
        </Text> : null}
      </Flex>

      <Table  >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Set</Table.Th>
            <Table.Th>Reps</Table.Th>
            <Table.Th>Weight</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {exercise.sets.map((set, setIndex) => (
            <Table.Tr key={uuidv4()}>
              <Table.Td>{setIndex + 1}</Table.Td>
              <Table.Td>
                <NumberInput
                  data-autofocus
                  w={75}
                  min={1}
                  max={99}
                  defaultValue={parseInt(set.reps)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "reps", value: value } },
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
                  defaultValue={parseInt(set.weight)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "weight", value: value } },
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
    </Container>
  ));

  return Tables;
}
