import { Anchor, Table } from "@mantine/core";

const data = [
  { name: "Squat", reps: 5, set: 4, weight: 185 },
  { name: "Squat", reps: 5, set: 4, weight: 185 },
  { name: "Squat", reps: 5, set: 4, weight: 185 },
  { name: "Squat", reps: 5, set: 4, weight: 185 },
  { name: "Squat", reps: 5, set: 4, weight: 185 },
];

export default function WorkoutList(props) {
  const rows = data.map((element, i) => (
    <tr key={element.name}>
      <td>{i + 1}</td>
      <td>{element.reps}</td>
      <td>{element.weight} </td>
    </tr>
  ));
  return (
    <section>
      <Anchor component="h1">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Anchor>
      <h2>Squats</h2>
      <Table>
        <thead>
          <tr>
            <th>Set(s)</th>
            <th>Reps</th>
            <th>Weight (lbs)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </section>
  );
}
