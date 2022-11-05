import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function SaveWorkoutBtn({
  saveWorkoutFunction,
  userID,
  template,
  workoutLoading,
}) {
  return (
    <button
      onClick={() =>
        saveWorkoutFunction({
          variables: {
            templateId: template._id,
            userID: userID,
          },
        })
      }
      className="save-workout-btn w-full"
    >
      <span className="flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
        Save as complete
        {workoutLoading && <Spinner color="purple" aria-label="loading" />}
      </span>
    </button>
  );
}
