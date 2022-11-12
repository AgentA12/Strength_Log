import { useState } from "react";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import WorkoutModal from "../workout/WorkoutModal";
import TemplateMenu from "./TemplateMenu";

export default function TemplateCard({ template, refetch }) {
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const [deleteTemplate, { data, loading, error }] =
    useMutation(DELETE_TEMPLATE);

  if (data) refetch();

  if (error) console.log(error);

  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="template-item w-96 p-3 border rounded-lg border-gray-600 hover:bg-primary_faded hover:bg-opacity-10 cursor-pointer transition-colors duration-100"
        onClick={() => setIsWorkoutModalOpen(!isWorkoutModalOpen)}
      >
        <div className="flex items-center justify-between relative">
          <h4 className="custom-ellipsis-title font-bold text-2xl mr-2">
            {template.templateName.toLocaleUpperCase()}
          </h4>
          <TemplateMenu template={template} deleteTemplate={deleteTemplate} />
        </div>

        <div className="mt-5 mr-2">
          <div className="font-semibold custom-ellipsis z-10 text-ellipsis">
            {template.exercises.map((exercise, i) => (
              <span
                className="text-primary_faded mr-2"
                key={exercise.exerciseName}
              >
                {template.exercises.length - 1 === i
                  ? capitalizeFirstLetter(exercise.exerciseName)
                  : capitalizeFirstLetter(exercise.exerciseName) + ","}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <WorkoutModal
        isWorkoutModalOpen={isWorkoutModalOpen}
        setIsWorkoutModalOpen={setIsWorkoutModalOpen}
        template={template}
      />
    </>
  );
}
