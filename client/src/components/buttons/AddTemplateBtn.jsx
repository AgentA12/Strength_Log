import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const buttonStyle = { color: "#c9a0ff" };

export default function AddTemplateBtn({ setOpenNav }) {
  return (
    <Link to={"Create-Template"} onClick={() => setOpenNav(false)}>
      <motion.button whileTap={{ scale: 0.9 }}>
        <span className="add-template-btn border-dotted">
          <HiPlus style={buttonStyle} size={20} /> Template
        </span>
      </motion.button>
    </Link>
  );
}
