import { Select } from "@mantine/core";
import { useState } from "react";

export default function TemplateSelect(args) {
  const [currentTemplate, setCurrentTemplate] = useState("Select a template");

  const templates = args.data?.getTemplatesForUser.map((template) => {
    let data = {};

    data.label = template.templateName;
    data.value = template.templateName;
    return data;
  });
  return (
    <Select
      sx={{ width: "fit-content" }}
      data={templates}
      searchable
      placeholder="Select a template"
      description="Templates"
      value={currentTemplate}
      onChange={(value) => {
        args.handleQuery(value);
        args.setActiveTemplate(value);
        args.getChartData(value);
        setCurrentTemplate(value);
      }}
    />
  );
}
