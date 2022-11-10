import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function ({ template, workoutLoading }) {
  return (
    <Link to={"/Workout"} state={{ template }}>
      <button className="start-workout-btn w-full">
        <span className="flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
          Start workout
          {workoutLoading && <Spinner color="purple" aria-label="loading" />}
        </span>
      </button>
    </Link>
  );
}
