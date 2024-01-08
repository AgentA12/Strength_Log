import { Text, Flex } from "@mantine/core";

interface Props {
  label: string;
  stat: number;
  icon: () => React.ReactNode;
}

export default function TotalDataDisplay(props: Props) {
  const { icon, stat, label } = props;

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
