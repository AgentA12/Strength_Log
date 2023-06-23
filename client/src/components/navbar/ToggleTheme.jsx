import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "hot-pink"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <BsSun size="1.1rem" /> : <BsMoon size="1.1rem" />}
    </ActionIcon>
  );
}
