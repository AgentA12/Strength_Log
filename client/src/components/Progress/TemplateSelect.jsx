// import { Option } from "@material-tailwind/react";
// import { Autocomplete } from "@mantine/core";
import { Select } from "@mantine/core";
import { useState } from "react";
export const TemplateSelect = (args) => {
  const templates = args.data?.getTemplatesForUser.map((template) => {
    let data = {};

    data.label = template.templateName;
    data.value = template.templateName;
    return data;
  });
  const [value, setValue] = useState("Select a template");

  return (
    <Select
      className="w-fit text-black"
      data={templates}
      searchable
      placeholder="Select a template"
      description="Select a template to view your progress"
      value={value}
      onChange={(e) => {
        setValue();

        args.handleQuery(e.toString());
        args.setActiveTemplate(e.toString());
        args.getChartData(e.toString());
      }}
    />
  );
};
