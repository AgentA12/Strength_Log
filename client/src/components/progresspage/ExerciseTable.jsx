import { v4 as uuidv4 } from "uuid";
import { Group, Table, Text } from "@mantine/core";
import { MdChangeHistory } from "react-icons/md";

export default function ExerciseTable({ exercise }) {
  const rows = exercise.sets.map((set, i) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{set.reps}</Table.Td>
      <Table.Td>{set.weight}</Table.Td>
      {exercise.change && (
        <Table.Td>{exercise.change > 0 ? `+ ${exercise.change}` : `${exercise.change}`} Lbs</Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <>
      <Text>{exercise.exercise.exerciseName}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Set</Table.Th>
            <Table.Th>Rep</Table.Th>
            <Table.Th>Weight</Table.Th>
            {exercise.change && (
              <Table.Th>
                <Group>
                  <MdChangeHistory size={24} />
                  <Text size="xs">(previous completed template)</Text>
                </Group>
              </Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}