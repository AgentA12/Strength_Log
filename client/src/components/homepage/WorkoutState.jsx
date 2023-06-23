import { useEffect } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { Flex, Group, NumberInput, Text } from "@mantine/core";

export default function WorkoutState({ templateState, handleChange, opened }) {
  const defaultValue = useRef();

  // refocus the first input on modal open
  useEffect(() => {
    defaultValue.current.focus();
  }, [opened]);

  return (
    <>
      {templateState.exercises.map((exercise, index) => (
        <Fragment key={exercise.exerciseName}>
          <Group mt={5}>
            <Text size="xl" color="hot-pink" fw={600}>
              {exercise.exerciseName}
            </Text>
          </Group>
          <Flex wrap={true} gap={10}>
            {index === 0 ? (
              <NumberInput
                label="Sets"
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
                label="Sets"
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
              label="Reps"
              defaultValue={parseInt(exercise.reps)}
              onChange={(value) =>
                handleChange({ target: { name: "reps", value: value } }, index)
              }
            />

            {exercise.weight !== "Body weight" ? (
              <NumberInput
                label="Weight"
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
        </Fragment>
      ))}
    </>
  );
}
