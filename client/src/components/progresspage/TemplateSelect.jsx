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

  templateData.push({ label: "All templates", value: "All templates" });

  return (
    <Select
      data={templateData}
      searchable
      placeholder="Select a template"
      description="Template(s)"
      defaultValue={"All templates"}
      value={activeTemplate}
      onChange={(value) => {
        setActiveTemplate(value);
      }}
    />
  );
}
