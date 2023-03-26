import { FcSearch } from "react-icons/fc";

export default function TemplateSearchBar() {
  return (
    <label className="relative inline-block w-64">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <FcSearch size={24} />
      </span>
      <input
        className="placeholder:italic bg-inherit placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-0 sm:text-sm"
        placeholder="Search for templates"
        type="text"
        name="search"
      />
    </label>
  );
}
