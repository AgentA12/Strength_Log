import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function ({ template, workoutLoading }) {
  const navigate = useNavigate();

  return (
    <button
      className="start-workout-btn w-full"
      onClick={() => {
        navigate("/Workout", { state: { template: template } });
      }}
    >
      <span className="flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
        Start workout
        {workoutLoading && <Spinner color="purple" aria-label="loading" />}
      </span>
    </button>
  );
}
