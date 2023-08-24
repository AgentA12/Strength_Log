import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function AddTemplateBtn() {
  return (
    <Link to={"/Create-template"}>
      <Button leftIcon={<HiPlus />}>
        Template
      </Button>
    </Link>
  );
}
