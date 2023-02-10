import { SiProgress } from "react-icons/si";
import { Button } from "@mantine/core";

export default function ProgressNavBtn() {
  return (
    <Button
      color={"grape"}
      variant="subtle"
      rightIcon={<SiProgress size={20} />}
    >
      Progress
    </Button>
  );
}