import { v4 as uuidv4 } from "uuid";
import { Group, Table } from "@mantine/core";
import { MdChangeHistory } from "react-icons/md";

export default function ExerciseTable({ exercise }) {
  const rows = exercise.sets.map((set, i) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{set.reps}</Table.Td>
      <Table.Td>{set.weight}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Set</Table.Th>
          <Table.Th>Rep</Table.Th>
          <Table.Th>Weight</Table.Th>
          {typeof exercise.sets[0].change === "number" && (
            <Table.Th>
              <Group gap={8}>
                <MdChangeHistory size={24} />
                (previous completed template)
              </Group>
            </Table.Th>
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
