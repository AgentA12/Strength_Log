import { motion } from "framer-motion";

export default function AddExerciseBtn({ addExercise }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={addExercise}
      type="button"
      className="add-template-btn"
    >
      Add Exercise
    </motion.button>
  );
}
