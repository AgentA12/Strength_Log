import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import EditTemplateModal from "./EditTemplateModal";
import capitalizeFirstLetter from "../../utils/helpers/functions";
import WorkoutModal from "./WorkoutModal";
import TemplateMenu from "./TemplateMenu";

export default function TemplateCard({ template, refetch }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const [deleteTemplate, {}] = useMutation(DELETE_TEMPLATE);

  async function handleDelete(event) {
    event.stopPropagation();

    const deleteTemplateRes = await deleteTemplate({
      variables: {
        templateId: template._id,
      },
    });

    if (deleteTemplateRes) {
      setIsEditOpen(!isEditOpen);
      //show toast to confirm template was deleted
    }
  }

  // function handleEdit(event) {
  //   event.stopPropagation();
  //   setIsEditTemplateOpen(!isEditTemplateOpen);
  // }

  return (
    <>
      <div
        className="template-item w-96 p-3 border rounded-lg border-gray-600 hover:bg-primary_faded hover:bg-opacity-10 cursor-pointer transition-colors duration-100"
        onClick={() => setIsWorkoutModalOpen(!isWorkoutModalOpen)}
      >
        <div className="flex items-center justify-between relative">
          <h4 className="font-bold text-2xl mr-1">
            {template.templateName.toLocaleUpperCase()}
          </h4>
          <TemplateMenu
            handleDelete={handleDelete}
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
      </div>
      {/* <EditTemplateModal
        template={template}
        isEditTemplateOpen={isEditTemplateOpen}
        setIsEditTemplateOpen={setIsEditTemplateOpen}
        refetch={refetch}
      /> */}
      <WorkoutModal
        isWorkoutModalOpen={isWorkoutModalOpen}
        setIsWorkoutModalOpen={setIsWorkoutModalOpen}
        template={template}
      />
    </>
  );
}
