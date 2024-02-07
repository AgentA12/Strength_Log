import { TextInput } from "@mantine/core";
import { SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TemplateShape } from "../../types/template";

interface Props {
  templates: any;
  setTemplates: React.Dispatch<SetStateAction<string>>;
  data: any;
}

export default function SearchTemplates({
  templates,
  setTemplates,
  data,
}: Props) {
  function filterTemplates(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const newTemplates = templates.filter((template: TemplateShape) => {
      return template.templateName
        .toLowerCase()
        .includes(event.currentTarget.value.toLowerCase());
    });

    if (newTemplates.length > 0) {
      setTemplates(newTemplates);
    }

    if (event.currentTarget.value.trim().length === 0) {
      setTemplates(data.getTemplates);
    }
  }

  return (
    <TextInput
      onChange={(event) => filterTemplates(event)}
      placeholder="Search templates..."
      leftSection={<AiOutlineSearch size={20} />}
    />
  );
}
