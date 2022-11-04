import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SaveTemplateBtn({ loading, handleSubmit }) {
  return (
    <motion.button
      onClick={handleSubmit}
      whileTap={{ scale: 0.8 }}
      type="button"
      className="add-exercise-btn"
    >
      Save Template
    </motion.button>
  );
}

export default SaveTemplateBtn;
