import { Text, Fieldset, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const colors = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

export default function PrefferedColorField() {
  const navigate = useNavigate();
  const color = localStorage.getItem("preferredColor");

  return (
    <Fieldset
      pt={5}
      legend={
        <Text fw={600} size="xl">
          Preferred Color
        </Text>
      }
      radius="md"
    >
      <Select
        onChange={(val) => {
          localStorage.setItem("preferredColor", val ? val : "teal");
          navigate(0);
        }}
        defaultValue={color}
        data={colors}
        description="Choose your preferred color"
      />
    </Fieldset>
  );
}
