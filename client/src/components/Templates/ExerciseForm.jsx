export default function ExerciseForm({ handleChange, index, formState }) {
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Exercise Name
          </label>
          <input
            onChange={(event) => handleChange(index, event)}
            name="exerciseName"
            className=" bg-overlay appearance-none block w-full text-grey-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:ring-0 focus:border-primary"
            type="text"
            value={formState.exercises[index].exerciseName}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="weight"
          >
            Weight <span className="lowercase">(lbs)</span>
          </label>
          <input
            name="weight"
            className="bg-overlay appearance-none block w-full  text-grey-400 border  rounded py-3 px-4 leading-tight focus:outline-none focus:ring-0 focus:border-primary"
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
              className="bg-overlay block appearance-none w-full border text-grey-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-0 focus:border-primary"
              onChange={(event) => handleChange(index, event)}
              value={formState.exercises[index].reps}
            ></input>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-400"></div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Sets
          </label>
          <input
            type="number"
            name="sets"
            className="bg-overlay appearance-none block w-full  text-grey-400 border  rounded py-3 px-4 leading-tight focus:outline-none focus:ring-0 focus:border-primary"
            onChange={(event) => handleChange(index, event)}
            value={formState.exercises[index].sets}
          />
        </div>
      </div>
    </>
  );
}
