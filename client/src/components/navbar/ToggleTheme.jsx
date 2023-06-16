import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" mb={30}>
      <Switch
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
        size="md"
        onLabel={<BsSun color={theme.white} size={14} stroke={1.5} />}
        offLabel={<BsMoon size={14} stroke={1.5} />}
      />
    </Group>
  );
}
