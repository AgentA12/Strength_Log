import { useEffect } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { Container, Flex, NumberInput, Text } from "@mantine/core";

export default function WorkoutState({ templateState, handleChange, opened }) {
  const defaultValue = useRef();
  // should refocus the element every time a model opens
  // but only works when chrome dev tools are open?

  useEffect(() => {
    defaultValue.current.focus();
  }, [opened]);

  return (
    <>
      {templateState.exercises.map((exercise, index) => (
        <Container key={exercise.exerciseName}>
          <Text>
            {exercise.exerciseName}({exercise.type})
          </Text>
          <Flex wrap={true}>
            {index === 0 ? (
              <NumberInput
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

            <NumberInput
              label="reps"
              defaultValue={parseInt(exercise.reps)}
              onChange={(value) =>
                handleChange({ target: { name: "reps", value: value } }, index)
              }
            />

            {exercise.weight !== "Body weight" ? (
              <NumberInput
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
            ) : null}
          </Flex>
        </Container>
      ))}
    </>
  );
}
