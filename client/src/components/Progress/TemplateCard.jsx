export default function TemplateCard({ template, activeTemplate }) {
  return (
    <div
      className={`${
        activeTemplate ? "border-white_faded" : null
      } whitespace-nowrap text-white p-4 max-w-xs overflow-ellipsis rounded-lg border border-gray-600 hover:border-white_faded shadow-md cursor-pointer transition-colors ease-in-out`}
    >
      <p className="h-5 mb-2 text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
