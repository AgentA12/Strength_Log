import { Table, Text } from "@mantine/core";
import { getPercentageOf1RM } from "../../utils/helpers/functions";

export default function OneRepMaxTable({ oneRepMax }) {
  const oneRepMaxAry = getPercentageOf1RM(oneRepMax);

  const rows = oneRepMaxAry.map((d) => (
    <Table.Tr key={d.percentage}>
      <Table.Td>
        <Text size="md">{d.percentage} %</Text>
      </Table.Td>
      <Table.Td>
        <Text size="md">{d.weight} lbs</Text>
      </Table.Td>
      <Table.Td>
        <Text size="md">{d.reps}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Percentage of 1RM</Table.Th>
          <Table.Th>Weight</Table.Th>
          <Table.Th>Repetitions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
