import { Table } from "@mantine/core";
import { CompareText } from "./index";
import { v4 as uuidv4 } from "uuid";

export default function CompareExerciseTable({ exercise }: any) {
  const rows = exercise.sets.map((set: any, i: number) => (
    <Table.Tr key={uuidv4()}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        {set.reps} {set.repChange ? CompareText(set.repChange) : null}
      </Table.Td>
      <Table.Td>
        {set.weight} {set.weightChange ? CompareText(set.weightChange) : null}
      </Table.Td>
    </Table.Tr>
  ));

  exercise.increasedSets.length
    ? exercise.increasedSets.map((e: any, i: number) => {
        rows.push(
          <Table.Tr c="green.6" key={uuidv4()}>
            <Table.Td>{exercise.sets.length + i + 1}</Table.Td>
            <Table.Td>{e.reps}</Table.Td>
            <Table.Td>{e.weight}</Table.Td>
          </Table.Tr>
        );
      })
    : exercise.decreasedSets.length
    ? exercise.decreasedSets.map((e: any, i: any) => {
        rows.push(
          <Table.Tr c="red.6" key={uuidv4()}>
            <Table.Td>{exercise.sets.length + i + 1}</Table.Td>
            <Table.Td>{e.reps}</Table.Td>
            <Table.Td>{e.weight}</Table.Td>
          </Table.Tr>
        );
      })
    : null;

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Set</Table.Th>
          <Table.Th>Rep</Table.Th>
          <Table.Th>Weight</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
