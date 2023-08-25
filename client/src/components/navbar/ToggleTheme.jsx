import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <ActionIcon
      color={dark ? "yellow" : "pink"}
      onClick={() => toggleColorScheme()}
      title="Toggle scheme "
      size="md"
     
      variant="outline"
    >
      {dark ? <BsSun size="0.9rem" /> : <BsMoon size="0.9rem" />}
    </ActionIcon>
  );
}
