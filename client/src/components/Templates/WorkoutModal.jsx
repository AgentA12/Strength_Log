import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { motion } from "framer-motion";

export default function WorkoutModal({
  template,
  isWorkoutModalOpen,
  setIsWorkoutModalOpen,
}) {
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const [workoutLoading, setWorkoutLoading] = useState(false);

  const [saveWorkoutFunction, { data, loading, error }] =
    useMutation(SAVE_WORKOUT);

  function handleClick({ target }) {
    setIsWorkoutModalOpen(!isWorkoutModalOpen);
  }
  const modalAnimation = {
    y: isWorkoutModalOpen ? 0 : 100,
    opacity: isWorkoutModalOpen ? 1 : 0,
  };

  return (
    <div
      aria-hidden="true"
      className={`${isWorkoutModalOpen ? "modal-container overflow-visible" : "hidden"}`}
    >
      <motion.div
        animate={modalAnimation}
        className="modal-body add-modal-height modal-scroll"
      >
        <div className="flex items-end justify-end">
          <span className="text-3xl font-bold ">{template.templateName}</span>

          <button
            onClick={handleClick}
            type="button"
            className="self-end bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
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

        <div className=" pt-5 bg-inherit text-center">
          <Link to={"/Progress"} state={{ template }}>
            <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-primary group-hover:from-purple-600 group-hover:to-primary  text-white focus:ring-4 focus:outline-none focus:ring-primary_faded dark:focus:ring-blue-800">
              <span className="flex gap-5 w-full justify-center items-center bg-overlay relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Start workout
                {workoutLoading && (
                  <Spinner color="purple" aria-label="loading" />
                )}
              </span>
            </button>
          </Link>

          <button
            onClick={() =>
              saveWorkoutFunction({
                variables: {
                  templateId: template._id,
                  userID: userID,
                },
              })
            }
            className="mt-3 w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-primary group-hover:from-purple-600 group-hover:to-primary  text-white focus:ring-4 focus:outline-none focus:ring-primary_faded dark:focus:ring-blue-800"
          >
            <span className="flex gap-5 w-full justify-center items-center bg-overlay relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Save as complete
              {workoutLoading && (
                <Spinner color="purple" aria-label="loading" />
              )}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
