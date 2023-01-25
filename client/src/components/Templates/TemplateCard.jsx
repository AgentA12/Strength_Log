import { useState } from "react";
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";

export default function TemplateCard({ template, handleTemplateDelete }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="template-item w-96 p-3 border rounded-lg border-gray-600  cursor-pointer "
        onClick={() => setOpened(!opened)}
      >
        <div className="flex items-center justify-between relative">
          <h4 className="custom-ellipsis-title font-bold text-2xl mr-2">
            {template.templateName.toLocaleUpperCase()}
          </h4>
          <TemplateMenu
            template={template}
            handleTemplateDelete={handleTemplateDelete}
          />
        </div>

        <div className="mt-5 mr-2">
          <div className="font-semibold custom-ellipsis z-10 text-ellipsis">
            {template.exercises.map((exercise, i) => (
              <span className=" mr-2" key={exercise.exerciseName}>
                {template.exercises.length - 1 === i
                  ? capitalizeFirstLetter(exercise.exerciseName)
                  : capitalizeFirstLetter(exercise.exerciseName) + ","}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <TemplateModal
        template={template}
        opened={opened}
        setOpened={setOpened}
      />
    </>
  );
}
