import { useState } from "react";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import {capitalizeFirstLetter} from "../../utils/helpers/functions";
import WorkoutModal from "../workout/WorkoutModal";
import TemplateMenu from "./TemplateMenu";
import CustomAlert from "../miscellaneous/CustomAlert";

export default function TemplateCard({ template, refetch }) {
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [showToast, setShowtoast] = useState(false);

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  async function handleDeleteTemplate(event) {
    event.stopPropagation();

    const deleteTemplateRes = await deleteTemplate({
      variables: {
        templateId: template._id,
      },
    });

    if (deleteTemplateRes) {
      refetch();
      setShowtoast(true);
      setTimeout(() => {
        setShowtoast(false);
      }, 3000);
    }
  }

  return (
    <>
      <CustomAlert
        message={`${template.templateName} was removed`}
        showToast={showToast}
        setShowtoast={setShowtoast}
      />
      <motion.div
        layout
        initial={{scale: .9,
          opacity: 0,
        }}
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
          <TemplateMenu
            handleDeleteTemplate={handleDeleteTemplate}
            template={template}
            refetch={refetch}
          />
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
