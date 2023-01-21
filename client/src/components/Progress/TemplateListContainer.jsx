import { Select, Option } from "@material-tailwind/react";

export const TemplateListContainer = (args) => {
  return (
    <div className="w-fit">
      <Select label="Select a template" variant="standard">
        {args.data?.getTemplatesForUser.map((template) => (
          <Option
            onClick={() => {
              args.handleQuery(template._id);
              args.setActiveTemplate(template.templateName);
              args.getChartData(template.templateName);
            }}
            key={template._id}
          >
            {template.templateName.toString()}
          </Option>
        ))}
      </Select>
    </div>
  );
};
