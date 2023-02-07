import { SiProgress } from "react-icons/si";
import { Tooltip } from "@mantine/core";

export default function ProgressNavBtn() {
  return (
    <Tooltip
      label="Progress"
      position="right-start"
      withArrow
      arrowPosition="center"
    >
      <p className="inline">
        <SiProgress size={30} />
      </p>
    </Tooltip>
  );
}
