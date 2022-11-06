import { motion } from "framer-motion";

function SaveTemplateBtn({  handleSubmit }) {
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
