import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import EditTemplateModal from "./EditTemplateModal";
import capitalizeFirstLetter from "../../utils/helpers/functions";
import { FaTrash, FaEdit, FaWeightHanging } from "react-icons/fa";
import WorkoutModal from "./WorkoutModal";

export default function TemplateCard({ template, refetch }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  let menuRef = useRef();
  let toolTipRef = useRef();

  //allows the edit/delete modal to close onClick outside of itself
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) setIsEditOpen(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [deleteTemplate, { data, loading, error }] =
    useMutation(DELETE_TEMPLATE);

  async function handleDelete(event) {
    event.stopPropagation()

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

  function handleEdit(event) {
    event.stopPropagation()
    setIsEditTemplateOpen(!isEditTemplateOpen);
  }

  function startWorkout() {
    setIsWorkoutModalOpen(!isWorkoutModalOpen);
  }

  return (
    <>
      <div
        className="template-item w-96 p-3 border rounded-lg border-primary hover:bg-primary_faded hover:bg-opacity-10 cursor-pointer "
        onClick={startWorkout}
      >
        <div className="flex items-center justify-between relative">
          <h4 className="font-bold text-2xl">
            {template.templateName.toLocaleUpperCase()}{" "}
          </h4>

          <button
            ref={toolTipRef}
            onMouseEnter={() => setIsEditOpen(true)}
            onMouseLeave={() => setIsEditOpen(false)}
            id="dropdownMenuIconHorizontalButton"
            data-dropdown-toggle="dropdownDotsHorizontal"
            className="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-gray-900 bg-primary_faded rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-primary"
            type="button"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>

          <div
            ref={menuRef}
            onMouseEnter={() => setIsEditOpen(true)}
            onMouseLeave={() => setIsEditOpen(false)}
            id="dropdownDotsHorizontal"
            className={`${
              isEditOpen ? null : "hidden"
            } absolute  -right-40 z-10 group-hover:z-10 w-44 bg-overlay text-white_faded rounded divide-y divide-gray-1=800 shadow `}
          >
            <ul
              className="py-1 text-sm"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  onClick={(event) => handleEdit(event)}
                  href="#"
                  className="flex items-center gap-1 py-2 px-4 hover:text-primary"
                  id="edit-template"
                >
                  <FaEdit size={14} />
                  Edit Template
                </a>
              </li>
              <li>
                <a
                  onClick={(event) => [handleDelete(event), refetch()]}
                  href="#"
                  className="flex items-center gap-1 py-2 px-4 hover:text-red-500"
                  id="delete-template"
                >
                  <FaTrash size={14} />
                  Delete Template
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 mr-2">
          <div className="font-semibold text-custom  z-10 text-ellipsis">
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
      <EditTemplateModal
        template={template}
        isEditTemplateOpen={isEditTemplateOpen}
        setIsEditTemplateOpen={setIsEditTemplateOpen}
        refetch={refetch}
      />
      <WorkoutModal
        toolTipRef={toolTipRef}
        isWorkoutModalOpen={isWorkoutModalOpen}
        setIsWorkoutModalOpen={setIsWorkoutModalOpen}
        template={template}
      />
    </>
  );
}
