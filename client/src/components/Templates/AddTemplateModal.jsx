import ExerciseForm from "./ExerciseForm";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import { Spinner } from "flowbite-react";

export default function AddTemplateModal({
  isAddTemplateModalOpen,
  setIsAddTemplateModalOpen,
  userID,
  refetch,
}) {
  //this ref is on the addExercise btn so the modal with scroll to the newly added exercise
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  const [formState, setFormState] = useState({
    templateName: "",
    exercises: [
      {
        exerciseName: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ],
  });

  //function for adding a template
  const [addTemplate, { data, loading, error }] = useMutation(CREATE_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  //call this to reset the addTemplateForm
  function resetFormState() {
    setFormState({
      templateName: "",
      exercises: [
        {
          exerciseName: "",
          sets: "",
          reps: "",
          weight: "",
        },
      ],
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const mutationRes = await addTemplate({
        variables: {
          ...formState,
          userId: userID,
        },
      });

      if (mutationRes) {
        //if template is added, close modal, reset form and refetch new templates
        setIsAddTemplateModalOpen(!isAddTemplateModalOpen);
        resetFormState();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //adds an exercise to the form
  function addExercise() {
    const exercise = {
      exerciseName: "",
      sets: "",
      reps: "",
      weight: "",
    };

    const data = { ...formState };

    data.exercises.push(exercise);

    setFormState(data);
  }

  function removeExercise(event, index) {
    let data = { ...formState };

    const filteredExercises = formState.exercises.filter((_, i) => {
      return i != index;
    });

    data.exercises = filteredExercises;

    setFormState(data);
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isAddTemplateModalOpen
          ? "template-modal flex items-center justify-center bg-background bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          : "hidden"
      }  `}
    >
      <div className="add-modal-height modal-scroll relative p-4 w-full max-w-2xl overflow-y-scroll bg-overlay text-white rounded-md">
        <div className="flex">
          <div className="w-full mb-5">
            <input
              onChange={(event) => handleChange(null, event)}
              name="templateName"
              className="text-4xl bg-overlay border-none appearance-none block w-full mb-3 leading-tight focus:outline-none focus:ring-0"
              type="text"
              placeholder="Template Name"
              value={formState.templateName}
            />
          </div>

          <button
            onClick={() => [
              setIsAddTemplateModalOpen(!isAddTemplateModalOpen),
              resetFormState(),
            ]}
            type="button"
            className="self-start bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
            data-modal-toggle="defaultModal"
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

        <form className="w-full" onSubmit={(event) => handleSubmit(event)}>
          {formState.exercises.map((exercise, index) => (
            <ExerciseForm
              key={index}
              handleChange={handleChange}
              index={index}
              formState={formState}
              removeExercise={removeExercise}
            />
          ))}

          <div className="text-center text-red-400">
            {error && error.message}
          </div>

          <button
            ref={bottomRef}
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
            Save Template
            {loading && (
              <Spinner color="purple" aria-label="Purple spinner example" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
