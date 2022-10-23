import { SiProgress } from "react-icons/si";

export default function ProgressNavBtn({ activeNav }) {
  return (
    <button
      className={`${activeNav === "Progress" && "text-primary"} nav-link`}
    >
      <SiProgress size={20} />
      Progress
    </button>
  );
}
