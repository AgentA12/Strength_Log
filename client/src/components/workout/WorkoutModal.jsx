import { Fragment } from "react";

import auth from "../../utils/auth/auth";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import StartWorkoutBtn from "../buttons/StartWorkoutBtn";
import SaveWorkoutBtn from "../buttons/SaveWorkoutBtn";

export default function WorkoutModal({
  template,
  isWorkoutModalOpen,
  setIsWorkoutModalOpen,
}) {
  const [saveWorkoutFunction, { loading, error }] = useMutation(SAVE_WORKOUT);

  async function handleSaveWorkout() {
    try {
      const res = await saveWorkoutFunction({
        variables: {
          templateId: template._id,
          userID: userID,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const {
    data: { _id: userID },
  } = auth.getInfo();

  function handleClick() {
    setIsWorkoutModalOpen(!isWorkoutModalOpen);
  }

  const modalAnimation = {
    y: isWorkoutModalOpen ? 0 : 100,
    opacity: isWorkoutModalOpen ? 1 : 0,
  };

  return (
    <div
      aria-hidden="true"
      className={`${
        isWorkoutModalOpen ? "modal-container overflow-visible" : "hidden"
      }`}
    >
      <motion.div
        animate={modalAnimation}
        className="modal-body add-modal-height modal-scroll mx-2"
      >
        <div className="flex items-end justify-end">
          <span className="custom-ellipsis-title text-3xl font-bold mr-3">
            {template.templateName}
          </span>

          <button
            onClick={handleClick}
            type="button"
            className=" self-start bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
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
        <div className="mt-4">
          {template.templateNotes.trim() ? "- " : null} {template.templateNotes}
        </div>
        <div className="p-5">
          {template.exercises.map((exercise, i) => (
            <Fragment key={exercise.exerciseName}>
              <p className="text-primary font-semibold text-3xl text-center">
                {exercise.exerciseName}
              </p>
              <div className="flex justify-center items-center gap-2 mb-2 text-xl">
                <span className="">
                  {exercise.sets} {exercise.sets && "x"}{" "}
                </span>
                <span className="">{exercise.reps}</span>
                <span className="text-white_faded">
                  {exercise.weight && `${exercise.weight} (lbs)`}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
          <StartWorkoutBtn template={template} />
          <SaveWorkoutBtn
            loading={loading}
            handleSaveWorkout={handleSaveWorkout}
          />
        </div>
        {error ? <div className="text-error">{error.message}</div> : null}
      </motion.div>
    </div>
  );
}
