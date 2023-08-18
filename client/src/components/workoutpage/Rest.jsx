import { Text, RingProgress } from "@mantine/core";

export default function RestTimer() {
  return (
    <RingProgress
      size={290}
      thickness={10}
      roundCaps
      label={
        <Text size="xs" align="center">
          Rest Time
        </Text>
      }
      sections={[{ value: 40 }]}
    />
  );
}
