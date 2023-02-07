import { HiOutlineTemplate } from "react-icons/hi";
import { Tooltip } from "@mantine/core";

export default function TemplateNavBtn() {
  return (
    <Tooltip
      label="Templates"
      position="right-start"
      withArrow
      arrowPosition="center"
    >
      <p className="inline">
        <HiOutlineTemplate size={30} />
      </p>
    </Tooltip>
  );
}
