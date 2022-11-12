import { motion } from "framer-motion";

export default function SaveTemplateBtn({ handleSubmit }) {
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
