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
        setActiveTemplate(template.templateName),
      ]}
      className={`${
        activeTemplate === template.templateName ? "border-gray-200" : null
      } text-white text-center block py-7 px-1 mx-1 max-w-sm rounded-lg border border-gray-600 hover:border-gray-300 shadow-md cursor-pointer transition-colors duration-200 `}
    >
      <p className="md:text-lg xl:text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
