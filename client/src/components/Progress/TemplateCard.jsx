export default function TemplateCard({
  template,
  handleQuery,
  activeTemplate,
  setActiveTemplate,
}) {
  return (
    <div
      onClick={() => [
        handleQuery(template._id),
        setActiveTemplate(template._id),
      ]}
      className={`${
        activeTemplate === template._id ? "border-gray-200" : null
      } text-white block p-6 max-w-sm rounded-lg border border-gray-600 hover:border-gray-200 shadow-md cursor-pointer ease-in-out`}
    >
      <p className="h-5 mb-2 text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
