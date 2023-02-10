import { GiCheckMark } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { motion } from "framer-motion";
import { Card } from "@mantine/core";

export default function ProgressCard({ progressInfo, handleSummary }) {
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      onClick={() => handleSummary(progressInfo)}
      className="my-5 cursor-pointer group w-fit"
    >
      <Card shadow="sm" withBorder p="lg" radius="md">
        <div className="flex justify-between items-center gap-1 sm:gap-5 flex-wrap-reverse md:flex-nowrap whitespace-wrap sm:whitespace-nowrap">
          <p className="text-2xl font-bold tracking-tight m-0">
            {progressInfo.dateCompleted}
          </p>
          <span className="self-start flex items-center w-min h-min gap-1 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
            Completed <GiCheckMark />
          </span>
        </div>

        <div className="flex gap-2 flex-wrap  sm:flex-nowrap justify-between font-normal text-gray-400 mt-5">
          <div className="flex gap-2">
            <span className="flex items-center gap-1 mr-5">
              <FaWeightHanging /> Total Weight: {progressInfo.totalWeight} (lbs)
            </span>
            {progressInfo.timeToComplete ? (
              <span className="flex items-center gap-1 mr-20">
                <BiTime />
                {progressInfo.timeToComplete}
              </span>
            ) : null}
          </div>
          <motion.span className="text-primary text-sm justify-self-end self-end opacity-0 group-hover:opacity-100 transition-all duration-150 group-hover:-translate-x-2">
            Show Summary
          </motion.span>
        </div>
      </Card>
    </motion.div>
  );
}
