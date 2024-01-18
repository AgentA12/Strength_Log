import { Text } from "@mantine/core";

export default function CompareText(num: number, unit = "Lbs") {
  if (num > 0) {
    return (
      <Text c="green.6" span>
        {" "}
        +{num} {unit && unit}
      </Text>
    );
  } else if (num < 0) {
    return (
      <Text c="red.6" span>
        {num} {unit && unit}
      </Text>
    );
  }
}
