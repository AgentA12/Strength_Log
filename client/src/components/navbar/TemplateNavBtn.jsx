import { HiOutlineTemplate } from "react-icons/hi";
import { Button } from "@mantine/core";

export default function TemplateNavBtn() {
  return (
    <Button
      variant="subtle"
      color={"grape"}
      rightIcon={<HiOutlineTemplate size={20} />}
    >
      Templates
    </Button>
  );
}
