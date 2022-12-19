import { BsCheck2All } from "react-icons/bs";

export default function RenderExercises({ exercise, handleWorkoutChange }) {
  const exerciseArray = [];

  for (let i = 0; i < parseInt(exercise.sets); i++) {
    exerciseArray.push(exercise);
  }

  return (
    <>
      {exerciseArray.map((exercise, i) => (
        <ul
          key={exercise._id}
          className={`flex justify-between items-center mt-2 py-1 px-2 ${
            exercise.isChecked ? "rounded-lg bg-opacity-20 bg-green-400" : null
          }`}
        >
          <li
            className={`px-2 rounded-md bg-inherit${
              !exercise.isChecked
                ? "bg-overlay_two "
                : "bg-opacity-20 bg-green-400"
            } `}
          >
            {i + 1}
          </li>
          <li
            className={`px-2 rounded-md ${
              !exercise.isChecked ? " bg-overlay_two " : " bg-green-400"
            } `}
          >
            <input
              className={`px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none ${
                !exercise.isChecked ? " bg-overlay_two" : "bg-green-400"
              } `}
              type="text"
              name="weight"
              value={exercise.weight}
              onChange={(event) => handleWorkoutChange(event, i)}
            />
          </li>
          <li>
            <input
              className={`px-2 w-10 text-center outline-none border-none focus:border-none focus:outline-none rounded-md ${
                !exercise.isChecked ? " bg-overlay_two " : "bg-green-400"
              }`}
              type="text"
              name="reps"
              value={exercise.reps}
              onChange={(event) => handleWorkoutChange(event, i)}
            />
          </li>
          <li>
            <button
              onClick={() => {}}
              className={`p-2 rounded-md hover:bg-green-400 ${
                !exercise.isChecked ? " bg-overlay_two " : "bg-green-400"
              } `}
            >
              <BsCheck2All />
            </button>
          </li>
        </ul>
      ))}
    </>
  );
}
