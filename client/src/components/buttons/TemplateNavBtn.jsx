import { HiOutlineTemplate } from "react-icons/hi";
import { Tooltip } from "@material-tailwind/react";

export default function TemplateNavBtn({ activeNav }) {
  return (
    <Tooltip
      content="Templates"
      placement="right-start"
      animate={{
        mount: { scale: 1, x: 0 },
        unmount: { scale: 0, x: -35 },
      }}
    >
      <button
        className={`${activeNav === "Templates" && "text-primary"} nav-link`}
      >
        <HiOutlineTemplate size={30} />
      </button>
    </Tooltip>
  );
}
