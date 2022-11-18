import { Spinner } from "flowbite-react";

export default function SaveWorkoutBtn({ loading, handleSaveWorkout }) {
  return (
    <button
      onClick={() => handleSaveWorkout()}
      className="save-workout-btn w-full"
    >
      <span
        className={`${
          loading ? "cursor-not-allowed" : "group-hover:bg-opacity-0"
        } flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md `}
      >
        Save as complete
        {loading && (
          <Spinner
            color="success"
            aria-label="loading"
            className="pl-4 bg-overlay"
          />
        )}
      </span>
    </button>
  );
}
