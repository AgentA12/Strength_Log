export default function TemplateCard({
  template,
  handleQuery,
  activeTemplate,
}) {
  
  return (
    <div
      onClick={() => handleQuery(template._id)}
      className="text-white block p-6 max-w-sm rounded-lg border border-gray-600 hover:border-gray-200 shadow-md cursor-pointer ease-in-out"
    >
      <p className="h-5 mb-2 text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
