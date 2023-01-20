export default function TemplateListItem({
  template,
  handleQuery,
  activeTemplate,
  setActiveTemplate,
  getChartData,
}) {
  return (
    <div
      onClick={() => {
        handleQuery(template._id);
        setActiveTemplate(template.templateName);
        getChartData(template.templateName);
      }}
      className={`${
        activeTemplate === template.templateName ? "border-gray-200" : null
      } text-white block py-2 px-1 mx-1 max-w-sm  border-b border-gray-600 hover:border-gray-300 shadow-md cursor-pointer transition-colors duration-200 `}
    >
      <p className="md:text-lg xl:text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
