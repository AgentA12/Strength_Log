import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { BsCheck2All } from "react-icons/bs";
import capitalizeFirstLetter from "../../utils/helpers/functions";

export default function Workout({ template }) {
  const [checked, setChecked] = useState(false);
  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     setSeconds(seconds + 1);
  //   }, 1000);
  // });

  function handleFinish() {
    console.log("Finished!");
  }

  function setExerciseChecked() {
    setChecked(!checked);
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={
        "bg-overlay text-white flex items-center justify-center max-h-full transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      }
    >
      <div className="p-5 border border-primary rounded-lg">
        <div className="flex gap-20 sm:gap-80 items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">{template.templateName}</h1>
          <Button gradientMonochrome="success" onClick={handleFinish}>
            Finish
          </Button>
        </div>
        <p className="mb-5">0:00:0</p>
        <div className="">
          {template.exercises.map((exercise) => (
            <div className="mb-5" key={exercise.exerciseName}>
              <p className="text-primary font-semibold text-2xl">
                {capitalizeFirstLetter(exercise.exerciseName)}
              </p>

              <ul className="flex justify-between items-center px-2">
                <li className="">Set</li>
                <li className="">Lbs</li>
                <li className="">Reps</li>
                <li className="p-2">
                  <BsCheck2All />
                </li>
              </ul>

              <ul
                className={`flex justify-between items-center mt-2 py-1 px-2 ${
                  checked && "rounded-lg bg-opacity-20 bg-green-400"
                }`}
              >
                <li
                  className={`px-2 ${!checked && "bg-overlay_two rounded-md"} `}
                >
                  1
                </li>
                <li
                  className={`px-2 ${!checked && "bg-overlay_two rounded-md"} `}
                >
                  155
                </li>
                <li
                  className={`px-2 ${!checked && "bg-overlay_two rounded-md"} `}
                >
                  6
                </li>
                <li>
                  <button
                    className={`p-2 rounded-md hover:bg-green-400 ${
                      !checked ? " bg-overlay_two " : "bg-green-400"
                    } `}
                    onClick={setExerciseChecked}
                  >
                    <BsCheck2All />
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className=" flex justify-center">
          <Button gradientMonochrome="failure">Cancel Workout</Button>
        </div>
      </div>
    </div>
  );
}
