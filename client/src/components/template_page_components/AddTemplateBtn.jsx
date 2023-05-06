import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function AddTemplateBtn({ setOpenNav }) {
  return (
    <Link to={"Create-Template"} onClick={() => setOpenNav(false)}>
      <Button leftIcon={<HiPlus size={24} />} variant={"outline"} >
        Template
      </Button>
    </Link>
  );
}
