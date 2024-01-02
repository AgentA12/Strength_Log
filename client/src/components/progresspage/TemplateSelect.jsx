import { Select } from "@mantine/core";

export default function TemplateSelect({
  templates,
  setActiveTemplate,
  activeTemplate,
}) {
  
  const templateData = templates.map((template) => {
    return {
      label: template.templateName,
      value: template.templateName,
    };
  });

  return (
    <Select
      data={templateData}
      searchable
      defaultValue={templateData[0] ? templateData[0] : []}
      value={activeTemplate}
      onChange={(value) => {
        setActiveTemplate(value);
      }}
    />
  );
}
