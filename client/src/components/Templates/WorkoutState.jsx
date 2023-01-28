import { useEffect } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { NumberInput, Input } from "@mantine/core";

export default function WorkoutState({ templateState, handleChange, opened }) {
  const value = useRef();
  templateState.exercises.forEach((exercise) => console.log(exercise));
  // only works when chrome dev tools are open???
  // should refocus the element every time a model opens
  useEffect(() => {
    value.current.focus();
  }, [opened]);
  return (
    <div>
      {templateState.exercises.map((exercise, index) => (
        <Fragment key={exercise.exerciseName}>
          <p className="font-semibold text-xl text-center mb-1">
            {exercise.exerciseName}{" "}
            <span className="text-xs text-gray-500">({exercise.type})</span>
          </p>
          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 mb-2 text-xl">
            <span>
              {/* Not use if this is the best way to conditionally apply a ref */}
              {index === 0 ? (
                <input
                  type="text"
                  label="sets"
                  name="sets"
                  defaultValue={exercise.sets}
                  className="rounded-lg px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none bg-gray-200"
                  onChange={(event) => handleChange(event, index)}
                  ref={value}
                />
              ) : (
                <input
                  type="text"
                  name="sets"
                  value={exercise.sets}
                  onChange={(event) => handleChange(event, index)}
                  className="rounded-lg px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none bg-gray-200"
                />
              )}{" "}
              x
            </span>
            <input
              type="text"
              name="reps"
              value={exercise.reps}
              onChange={(event) => handleChange(event, index)}
              className="rounded-lg px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none bg-gray-200"
            />
            <span className="_faded">
              {exercise.weight !== "Body weight" ? (
                <span className="">
                  {" "}
                  <input
                    type="text"
                    name="weight"
                    value={exercise.weight}
                    onChange={(event) => handleChange(event, index)}
                    className="rounded-lg px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none bg-gray-200"
                  />{" "}
                  lbs
                </span>
              ) : null}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
