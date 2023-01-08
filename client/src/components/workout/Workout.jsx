import { useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Counter from "../miscellaneous/Counter";
import FinishedModel from "./FinishedModel";
import { motion } from "framer-motion";
import RenderExercises from "../summary/RenderExercises";

export default function Workout() {
  const { state } = useLocation();

  const [workoutState, setWorkoutState] = useState({
    exercises: [
      {
        exerciseName: "Bench Press",
        reps: "8",
        sets: "3",
        weight: "225",
        isChecked: false,
        _id: "6377b1e8add80e8bbe892fb5",
      },
      {
        exerciseName: "Barbell Rows",
        reps: "12",
        sets: "4",
        weight: "275",
        isChecked: false,
        _id: "6377bd6b95f0e61faad37633",
      },
      {
        exerciseName: "Shoulder Press",
        reps: "6",
        sets: "5",
        weight: "135",
        isChecked: false,
        _id: "6377bd8a95f0e61faad3764f",
      },
    ],
    templateName: "Upper Body",
    templateNotes: "test",
    _id: "6377b1e8add80e8bbe892fb7",
  });

  const time = new Date();

  time.setSeconds(time.getSeconds() + 100);

  const [isOpen, setIsOpen] = useState(false);

  function handleWorkoutChange({ target }, i) {
    let data = { ...workoutState };

    data.exercises[i][target.name] = target.value;

    setWorkoutState({ ...data });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        className={
          " flex justify-center py-5 modal-scroll bg-overlay text-white h-screen overflow-y-scroll absolute top-0 right-0 w-full"
        }
      >
        <div className="p-5 min-w-min">
          <div className="flex gap-20 sm:gap-80 items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">
              {workoutState.templateName}
            </h1>

            <button
              className="save-workout-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              Finish
            </button>
          </div>

          <Counter />

          {workoutState.exercises.map((exercise, i) => (
            <div className="mb-5" key={exercise._id}>
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

              <RenderExercises
                exercise={exercise}
                handleWorkoutChange={handleWorkoutChange}
              />
            </div>
          ))}

          <div className="flex justify-center pb-8">
            <Link to="/Templates">
              <button className="bg-transparent py-2 px-4 border border-error hover:border-opacity-10 hover:bg-opacity-10 hover:bg-error rounded transition-colors ease-in">
                Cancel Workout
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
      <FinishedModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
