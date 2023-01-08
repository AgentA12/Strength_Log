import Spinner from "../miscellaneous/Spinner";
import { useState } from "react";

export default function SaveWorkoutBtn({ handleSaveWorkout, loading, data }) {
  const [buttonText, setButtonText] = useState("Save as complete");

  return (
    <button onClick={handleSaveWorkout} className="save-workout-btn w-full">
      <span
        className={`${
          buttonText === "Saved!"
            ? "cursor-not-allowed bg-opacity-0 group-hover:bg-none"
            : "group-hover:bg-opacity-0"
        } flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md `}
      >
        {loading ? (
          <Spinner color={"green-500"} className="pl-4" />
        ) : data?.saveWorkout?.username ? (
          "saved!"
        ) : (
          "Save as complete"
        )}
      </span>
    </button>
  );
}
