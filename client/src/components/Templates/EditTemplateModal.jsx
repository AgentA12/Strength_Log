import ExerciseFormEdit from "./ExerciseFormEdit";
import { useState } from "react";
import { EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

export default function EditTemplateModal({
  template,
  setIsEditTemplateOpen,
  isEditTemplateOpen,
  refetch,
}) {
  const cloneTemplate = structuredClone(template);

  const [editFormState, setEditFormState] = useState(cloneTemplate);

  const [editTemplate, { data, loading, error }] = useMutation(EDIT_TEMPLATE);

  if (error) console.log(error);

  function handleChange(index, { target }) {
    let data = { ...editFormState };

    if (target.name !== "templateName") {
      data.exercises[index][target.name] = target.value;

      setEditFormState({ ...data });
      return;
    }

    setEditFormState({ ...editFormState, [target.name]: target.value });
  }

  async function handleEditSubmit(event) {
    event.preventDefault();

    const mutationRes = await editTemplate({
      variables: {
        ...editFormState,
      },
    });

    if (mutationRes) {
      setIsEditTemplateOpen(!isEditTemplateOpen);
      refetch();
    }
  }

  function addExercise() {
    const exercise = {
      exerciseName: "",
      sets: "",
      reps: "",
      weight: "",
    };

    const data = { ...editFormState };

    data.exercises.push(exercise);

    setEditFormState(data);
  }

  function removeExercise(event, index) {
    let data = { ...editFormState };

    const filteredExercises = editFormState.exercises.filter((_, i) => {
      return i != index;
    });

    data.exercises = filteredExercises;

    setEditFormState(data);
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isEditTemplateOpen
          ? "template-modal  flex items-center justify-center bg-background bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          : "hidden"
      }  `}
    >
      <div className="add-modal-height modal-scroll relative p-4 w-full max-w-2xl overflow-y-scroll bg-overlay text-white rounded-md">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto  bg-overlay text-white rounded-md">
          <div className="flex">
            <div className="w-full mb-5">
              <input
                name="templateName"
                className="text-4xl bg-overlay border-none appearance-none block w-full mb-3 leading-tight focus:outline-none focus:ring-0"
                type="text"
                placeholder="Template Name"
                value={editFormState.templateName}
                onChange={(event) => handleChange(null, event)}
              />
            </div>

            <button
              type="button"
              className="self-start bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
              data-modal-toggle="defaultModal"
              onClick={() => setIsEditTemplateOpen(!isEditTemplateOpen)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="w-full" onSubmit={handleEditSubmit}>
            {editFormState.exercises.map((exercise, index) => (
              <ExerciseFormEdit
                exercise={exercise}
                index={index}
                handleChange={handleChange}
                key={exercise._id}
                removeExercise={removeExercise}
              />
            ))}

            <div className="text-center text-red-400">
              {error && error.message}
            </div>

            <button
              onClick={addExercise}
              type="button"
              className="w-full font-medium rounded-lg text-sm px-5 py-2.5 justify-center my-8 flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40  focus:outline-none focus:ring-0  text-center"
            >
              Add Exercise
            </button>

            <button
              type="submit"
              className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center"
            >
              Edit Template
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
