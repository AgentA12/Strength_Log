import { GiCheckMark } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { motion } from "framer-motion";
import { Card } from "@mantine/core";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ProgressCard({ progressInfo, handleSummary }) {
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      onClick={() => handleSummary(progressInfo)}
    >
      <Card shadow="sm" withBorder p="lg" radius="md">
        {progressInfo.dateCompleted}
        Completed <GiCheckMark />
        <FaWeightHanging /> Total Weight: {progressInfo.totalWeight} (lbs)
        {progressInfo.timeToComplete ? (
          <>
            <BiTime />
            {progressInfo.timeToComplete}
          </>
        ) : null}
        <motion.span>
          View Summary <AiOutlineArrowRight />
        </motion.span>
      </Card>
    </motion.div>
  );
}
