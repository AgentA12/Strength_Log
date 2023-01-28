import { Input } from "@mantine/core";
import { FcSearch } from "react-icons/fc";

export default function SearchTemplates({ templates, handleFilterTemplates }) {
  return (
    <Input
      icon={<FcSearch />}
      onChange={(event) => handleFilterTemplates(event, templates)}
      placeholder="Search templates..."
      radius="md"
      size="md"
    />
  );
}
