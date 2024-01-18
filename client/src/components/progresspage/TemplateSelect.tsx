import { Select } from "@mantine/core";
import { TemplateShape } from "../../types";

interface Props {
  templates: TemplateShape[];
  setActiveTemplate: React.Dispatch<React.SetStateAction<string>>;
  activeTemplate: string;
  label?: string;
}

export default function TemplateSelect({
  templates,
  setActiveTemplate,
  activeTemplate,
  label,
}: Props) {
  const templateData = templates.map((template) => {
    return {
      label: template.templateName,
      value: template.templateName,
    };
  });

  return (
    <Select
      allowDeselect={false}
      label={label ? label : null}
      data={templateData}
      searchable
      value={activeTemplate}
      onChange={(val: string | null) => setActiveTemplate(val ? val : "")}
    />
  );
}
