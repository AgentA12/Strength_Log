import { HiPlus } from "react-icons/hi";

const buttonStyle = { color: "#c9a0ff" };

export default function AddTemplateBtn({
  setIsAddTemplateModalOpen,
  isAddTemplateModalOpen,
}) {
  return (
    <button onClick={() => setIsAddTemplateModalOpen(!isAddTemplateModalOpen)}>
      <span className="add-template-btn">
        <HiPlus style={buttonStyle} size={20} /> Template
      </span>
    </button>
  );
}
