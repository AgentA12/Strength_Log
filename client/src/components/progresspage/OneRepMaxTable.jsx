import { Table, Text } from "@mantine/core";

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
          <th>Repetitions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function getPercentageOf1RM(oneRepMax) {
  const repMax = parseFloat(oneRepMax);
  let reps = 30;
  let data = [];
  let percentage = 50;

  while (reps >= 2) {
    data.unshift({
      percentage: percentage,
      reps: reps,
      weight: parseFloat(((percentage / 100) * repMax).toFixed(1)),
    });
    if (reps === 30) {
      reps = reps - 6;
    } else if (reps >= 16) {
      reps = reps - 4;
    } else {
      reps = reps - 2;
    }
    percentage = percentage + 5;
  }

  data.unshift({ weight: parseFloat(oneRepMax), percentage: 100, reps: 1 });

  return data;
}
