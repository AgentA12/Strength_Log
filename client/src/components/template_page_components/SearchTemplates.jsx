import { Input } from "@mantine/core";
import { FcSearch } from "react-icons/fc";

export default function SearchTemplates({ templates, filterTemplates }) {
  return (
    <Input
      icon={<FcSearch />}
      onChange={(event) => filterTemplates(event, templates)}
      placeholder="Search templates..."
      radius="md"
      size="md"
    />
  );
}
