import { Container, Flex, Group, NumberInput, Text } from "@mantine/core";
import { SaveWorkoutBtn, StartWorkoutBtn } from "./index";

export default function WorkoutState({
  loading,
  handleSaveWorkout,
  setTemplateState,
  templateState
}) {

  function handleChange({ target }, index) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[index][target.name] = parseInt(target.value);

    setTemplateState({ ...data });
  }

  return (
    <>
      {templateState?.exercises.map((exercise, index) => (
        <Container key={exercise._id}>
          <Group mt={5}>
            <Text
              size="xl"
              sx={(theme) => ({ color: theme.colors.violet[5] })}
              fw={700}
            >
              {exercise.exercise.name}
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
        </Container>
      ))}

      <Flex justify="space-around" align="center" mt={15}>
        <SaveWorkoutBtn
          loading={loading}
          handleSaveWorkout={handleSaveWorkout}
          templateState={templateState}
        />
        <StartWorkoutBtn />
      </Flex>
    </>
  );
}
