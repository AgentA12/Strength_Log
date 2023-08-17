import { Table, ScrollArea } from "@mantine/core";

export default function TableSelection({ exercise }) {
  const rows = (
    <>
      {new Array(exercise.sets).fill("").map((e, index) => (
        <tr key={exercise.exerciseName}>
          <td>{index + 1}</td>
          <td>{exercise.reps}</td>
          <td>{exercise.weight}</td>
        </tr>
      ))}
    </>
  );

  return (
    <ScrollArea>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>SETS</th>
            <th>REPS</th>
            <th>WEIGHT</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
