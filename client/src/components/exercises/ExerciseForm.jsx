import { IoMdRemove } from "react-icons/io";
import { motion } from "framer-motion";

export default function ExerciseForm({
  handleChange,
  index,
  formState,
  removeExercise,
}) {
  return (
    <motion.div
      layout
      initial={{ x: 0, y: -35, opacity: 0 }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ type: "", damping: 40, stiffness: 900 }}
      className="border border-gray-600 rounded-lg p-5 mb-7"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <div className="flex items-center justify-between mb-2">
            <label
              className="block uppercase tracking-wide text-grey-400 text-xs font-bold "
              htmlFor="grid-password"
            >
              Exercise Name
            </label>
          </div>

          <input
            onChange={(event) => handleChange(index, event)}
            name="exerciseName"
            className=" bg-inherit appearance-none border border-gray-600 rounded w-full py-2 px-4  leading-tight focus:ring-0 focus:outline-none  transition-colors ease-in"
            type="text"
            value={formState.exercises[index].exerciseName}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-3 pb-4 border-b border-gray-600">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="weight"
          >
            Weight <span className="lowercase">(lbs)</span>
          </label>
          <input
            name="weight"
            className="bg-inherit appearance-none border border-gray-600 rounded w-full py-2 px-4  leading-tight focus:ring-0 focus:outline-none  transition-colors  ease-in"
            type="number"
            onChange={(event) => handleChange(index, event)}
            value={formState.exercises[index].weight}
          />
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Reps
          </label>
          <div className="relative">
            <input
              type="number"
              name="reps"
              className="bg-inherit appearance-none border border-gray-600 rounded w-full py-2 px-4  leading-tight focus:ring-0 focus:outline-none  transition-colors  ease-in"
              onChange={(event) => handleChange(index, event)}
              value={formState.exercises[index].reps}
            ></input>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-400"></div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Sets
          </label>
          <input
            type="number"
            name="sets"
            className="bg-inherit appearance-none border border-gray-600 rounded w-full py-2 px-4  leading-tight focus:ring-0 focus:outline-none  transition-colors  ease-in"
            onChange={(event) => handleChange(index, event)}
            value={formState.exercises[index].sets}
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-inherit">
        <select
          onChange={(event) => handleChange(index, event)}
          name="type"
          className="w-6/12 bg-inherit appearance-none border border-gray-600 rounded py-2 px-4  leading-tight focus:ring-0 focus:outline-none  transition-colors ease-in mr-5"
          defaultValue={"Barbell"}
          value={formState.exercises[index].type}
        >
          <option disabled hidden className="text-gray-600 bg-inherit">
            Type
          </option>
          <option className="bg-inherit" value="Barbell">Barbell</option>
          <option value="Dumbell">Dumbell</option>
          <option value="Machine">Machine</option>
          <option value="Cable">Cable</option>
          <option value="Body weight">Body weight</option>
          <option value="Other">Other</option>
        </select>
        {/* if rendering the first exercise, dont show the remove exercise button */}
        {index !== 0 ? (
          <button
            onClick={(event) => removeExercise(event, index)}
            type="button"
            className="flex items-center bg-transparent py-2 px-4 border border-error hover:border-opacity-10 hover:bg-opacity-10 hover:bg-error rounded transition-colors ease-in"
          >
            <span className="pr-2">Remove Exercise</span>{" "}
            <IoMdRemove color={"white"} />
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
