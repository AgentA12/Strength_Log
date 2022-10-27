import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const buttonStyle = { color: "#c9a0ff" };

export default function AddTemplateBtn({
  setIsAddTemplateModalOpen,
  isAddTemplateModalOpen,
}) {
  return (
    <Link to={"Create-Template"}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAddTemplateModalOpen(!isAddTemplateModalOpen)}
      >
        <span className="add-template-btn">
          <HiPlus style={buttonStyle} size={20} /> Template
        </span>
      </motion.button>
    </Link>
  );
}
