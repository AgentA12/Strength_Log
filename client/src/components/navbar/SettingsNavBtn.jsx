import { Button } from "@mantine/core";
import { FiSettings } from "react-icons/fi";
export default function SettingsNavBtn() {
  return (
    <Button
      color={"grape"}
      variant="subtle"
      rightIcon={<FiSettings size={20} />}
    >
      Settings
    </Button>
  );
}
