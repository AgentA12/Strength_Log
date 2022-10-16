export default function Routine({ template }) {
  function handleClick() {}

  return (
    <div
      onClick={handleClick}
      className="text-white block p-6 max-w-sm rounded-lg border border-white_faded hover:border-primary shadow-md  cursor-pointer"
    >
      <p className="h-5 mb-2 text-2xl font-bold tracking-tight">
        {template.templateName}
      </p>
    </div>
  );
}
