import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import EditTemplateModal from "./EditTemplateModal";
import capitalizeFirstLetter from "../../utils/helpers/functions";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TemplateCard({ template, refetch }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);

  let menuRef = useRef();

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

  async function handleDelete() {
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

  function handleEdit() {
    setIsEditTemplateOpen(!isEditTemplateOpen);
  }

  return (
    <>
      <div className="template-item w-96 p-3 border rounded-lg border-primary">
        <div className="flex items-center justify-between relative">
          <h4 className="font-bold text-2xl">
            {template.templateName.toLocaleUpperCase()}{" "}
          </h4>

          <button
            onClick={() => setIsEditOpen(!isEditOpen)}
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
            id="dropdownDotsHorizontal"
            className={`${
              isEditOpen ? null : "hidden"
            } absolute -right-40 z-10 w-44 bg-overlay text-white_faded rounded divide-y divide-gray-1=800 shadow `}
          >
            <ul
              className="py-1 text-sm"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  onClick={handleEdit}
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
                  onClick={() => [handleDelete(), refetch()]}
                  href="#"
                  className="flex items-center gap-1 py-2 px-4 hover:text-primary"
                  id="delete-template"
                >
                  <FaTrash size={14} />
                  Delete Template
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5">
          {template.exercises.map((exercise, i) => (
            <div className="font-semibold text-xl mb-2" key={i}>
              <h5 className="text-primary_faded">
                {capitalizeFirstLetter(exercise.exerciseName)}
              </h5>
              <span>{exercise.sets} x </span>
              <span>{exercise.reps}</span>
              <span className="ml-2 text-white_faded text-sm">
                {exercise.weight ? exercise.weight + " lbs" : null}
              </span>
            </div>
          ))}
        </div>
      </div>
      <EditTemplateModal
        template={template}
        isEditTemplateOpen={isEditTemplateOpen}
        setIsEditTemplateOpen={setIsEditTemplateOpen}
        refetch={refetch}
      />
    </>
  );
}
