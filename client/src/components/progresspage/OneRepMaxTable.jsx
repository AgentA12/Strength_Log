import { Table, Text } from "@mantine/core";
import { getPercentageOf1RM } from "../../utils/helpers/functions";

export default function OneRepMaxTable({ oneRepMax }) {
  const oneRepMaxAry = getPercentageOf1RM(oneRepMax);

  const rows = oneRepMaxAry.map((d) => (
    <tr key={d.percentage}>
      <td>
        <Text size="md">{d.percentage}%</Text>
      </td>
      <td>
        <Text size="md">{d.weight} lb</Text>
      </td>
      <td>
        <Text size="md">{d.reps}</Text>
      </td>
    </tr>
  ));

  return (
    <Table
      horizontalSpacing="xl"
      verticalSpacing="md"
      striped
      withColumnBorders
    >
      <thead>
        <tr>
          <th>Percentage of 1RM</th>
          <th>Weight</th>
          <th>Repetition(s)</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
