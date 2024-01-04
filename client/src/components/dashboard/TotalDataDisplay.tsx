import { Text, Flex } from "@mantine/core";

export default function TotalDataDisplay({ label, stat, icon }) {
  return (
    <Flex direction="column" justify="center">
      <Flex justify={{ base: "center", lg: "flex-start" }} align="center">
        {icon()}
        <Text ml={5}>{Intl.NumberFormat("en-US").format(stat)}</Text>
      </Flex>
      <Text ta="center" fw={400} c="dimmed" tt="capitalize">
        {label}
      </Text>
    </Flex>
  );
}
