import ExerciseForm from "./ExerciseForm";
import { useRef } from "react";

export default function AddTemplateModal({
  isModalOpen,
  handleChange,
  handleSubmit,
  setIsModalOpen,
  resetFormState,
  formState,
  addExercise,
}) {
  const scrollRef = useRef();

  function setScrollHeight() {}

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen
          ? "flex items-center justify-center bg-background bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          : "hidden"
      }  `}
    >
      <div
        ref={scrollRef}
        className="relative p-4 w-full max-w-2xl max-h-96 overflow-y-scroll bg-overlay text-white rounded-md"
      >
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
            onClick={() => [setIsModalOpen(!isModalOpen), resetFormState()]}
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
          {formState.exercises.map((input, index) => (
            <ExerciseForm
              key={index}
              handleChange={handleChange}
              index={index}
              formState={formState}
            />
          ))}

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
            Save Template
          </button>
        </form>
      </div>
    </div>
  );
}
