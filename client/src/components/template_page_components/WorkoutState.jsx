import { useEffect } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { NumberInput } from "@mantine/core";

export default function WorkoutState({ templateState, handleChange, opened }) {
  const defaultValue = useRef();
  // should refocus the element every time a model opens
  // but only works when chrome dev tools are open?

  useEffect(() => {
    defaultValue.current.focus();
  }, [opened]);

  return (
    <div>
      {templateState.exercises.map((exercise, index) => (
        <Fragment key={exercise.exerciseName}>
          <p className="font-bold text-3xl text-center m-0">
            {exercise.exerciseName}
            <span className="text-xs ml-2 text-gray-500">
              ({exercise.type})
            </span>
          </p>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 mb-5 text-xl">
            <span>
              {index === 0 ? (
                <NumberInput
                  className="w-24"
                  label="sets"
                  value={parseInt(exercise.sets)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "sets", value: value } },
                      index
                    )
                  }
                  ref={defaultValue}
                />
              ) : (
                <NumberInput
                  className="w-24"
                  label="sets"
                  defaultValue={parseInt(exercise.sets)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "sets", value: value } },
                      index
                    )
                  }
                />
              )}
            </span>
            <NumberInput
              label="reps"
              className="w-24"
              defaultValue={parseInt(exercise.reps)}
              onChange={(value) =>
                handleChange({ target: { name: "reps", value: value } }, index)
              }
            />

            {exercise.weight !== "Body weight" ? (
              <div className="flex items-center justify-center gap-1">
                <NumberInput
                  className="w-24"
                  label="weight"
                  step={5}
                  defaultValue={parseInt(exercise.weight)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "weight", value: value } },
                      index
                    )
                  }
                />
              </div>
            ) : null}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
