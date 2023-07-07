import { Table as MantineTable, Tooltip } from "@mantine/core";

const elements = [
  {
    exercise: "Bench press",
    "Total Volume": 1200 + " lbs",
    toolTipData: "4 sets x 6 reps",
  },
  {
    exercise: "Pull ups",
    "Total Volume": 1400 + " lbs",
    toolTipData: "",
  },
  {
    exercise: "Dumbell bench press",
    "Total Volume": 8906 + " lbs",
    toolTipData: "",
  },
  {
    exercise: "Dumbell row",
    "Total Volume": 1333 + " lbs",
    toolTipData: "",
  },
  {
    exercise: "Chest fly",
    "Total Volume": 1412 + " lbs",
    toolTipData: "",
  },
  {
    exercise: "Face pull",
    "Total Volume": 1412 + " lbs",
    toolTipData: "",
  },
];

export default function Table() {
  const rows = elements.map((element) => (
    <Tooltip.Floating
      multiline
      witharrow="true"
      width="fit"
      transitionprops={{ duration: 200 }}
      label={element.toolTipData}
      key={element.exercise}
    >
      <tr>
        <td>{element.exercise}</td>
        <td>{element["Total Volume"]}</td>
      </tr>
    </Tooltip.Floating>
  ));

  return (
    <MantineTable striped highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Total Volume</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </MantineTable>
  );
}
