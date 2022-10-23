import { HiOutlineTemplate } from "react-icons/hi";

export default function TemplateNavBtn({ activeNav }) {
  return (
    <button
      className={`${
        activeNav === "Templates" && "text-primary"
      } nav-link`}
    >
      <HiOutlineTemplate size={20} />
      Templates
    </button>
  );
}
