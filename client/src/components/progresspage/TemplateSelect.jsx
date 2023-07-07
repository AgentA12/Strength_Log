import { Select } from "@mantine/core";
import { useState } from "react";

export default function TemplateSelect({
  templates,
  handleQuery,
  setActiveTemplate,
  getChartData,
  activeTemplate,
}) {
  const templateData = templates.map((template) => {
    let data = {};

    data.label = template.templateName;
    data.value = template.templateName;
    return data;
  });

  templateData.push({ label: "All templates", value: "All templates" });

  return (
    <Select
      data={templateData}
      searchable
      placeholder="Select a template"
      description="Template(s)"
      value={activeTemplate}
      onChange={(value) => {
        handleQuery(value);
        setActiveTemplate(value);
        getChartData(value);
      }}
    />
  );
}
