import { IoSettingsOutline } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";

export default function SettingsBtn({ activeNav }) {
  return (
    <Tooltip content="Settings" placement="right-start"  
    animate={{
        mount: { scale: 1, x: 0 },
        unmount: { scale: 0, x: -35 },
      }}>
      <button
        className={`${activeNav === "Settings" && "text-primary"} nav-link`}
      >
        <IoSettingsOutline size={30} />
      </button>
    </Tooltip>
  );
}
