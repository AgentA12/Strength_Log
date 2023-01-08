import { BiTrendingUp } from "react-icons/bi";

export default function RenderExercises({ exercise }) {
  const exerciseArray = [];

  for (let i = 0; i < parseInt(exercise.sets); i++) {
    exerciseArray.push(exercise);
  }


  return (
    <div>
      <h5 className="text-primary">{exercise.exerciseName.toUpperCase()}</h5>
      <ul className="flex gap-16 mt-2 py-1">
        <li>Sets</li>
        <li>Weight</li>
        <li>Reps</li>
        <li>1RM</li>
        <li className="self-end justify-self-end">
          <span className="text-green-500 flex items-center justify-center gap-2">
            + 5 (lbs) <BiTrendingUp size={25} />
          </span>
        </li>
      </ul>
      {exerciseArray.map((exercise, i) => (
        <ul
          key={exercise._id}
          className={`flex gap-16 my-2 py-1 ${
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
          <li>
            <p className="px-2">{exercise.weight === null ? 0 : exercise.weight}</p>
          </li>
          <li>
            <p className="px-2 w-10 text-center outline-none border-none focus:border-none focus:outline-none rounded-md">
              {exercise.reps}
            </p>
          </li>
          <li>
            <p className="px-2 w-10 text-center outline-none border-none focus:border-none focus:outline-none rounded-md">
              205
            </p>
          </li>
        </ul>
      ))}
    </div>
  );
}
