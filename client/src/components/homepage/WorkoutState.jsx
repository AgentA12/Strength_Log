import {
  Container,
  Text,
  Table,
  useMantineTheme,
  NumberInput,
} from "@mantine/core";

export default function WorkoutState({ setTemplateState, templateState }) {
  const theme = useMantineTheme();

  function handleChange({ target }, exerciseIndex, setIndex) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[exerciseIndex].sets[setIndex][target.name] = parseInt(
      target.value
    );

    setTemplateState({ ...data });
  }

  const Tables = templateState.exercises.map((exercise, exerciseIndex) => (
    <Container mb={10}>
      <Text fz={20} fw="bolder" color={theme.colors.brand[6]} mt={10}>
        {exercise.exercise.exerciseName.toUpperCase()}
      </Text>
      <Table withBorder withColumnBorders key={exercise._id} >
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {exercise.sets.map((set, setIndex) => (
            <tr key={exercise._id}>
              <td>{setIndex + 1}</td>
              <td>
                <NumberInput
                  w={75}
                  min={1}
                  max={99}
                  defaultValue={parseInt(set.reps)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "reps", value: value } },
                      exerciseIndex,
                      setIndex
                    )
                  }
                />
              </td>
              <td>
                <NumberInput
                  w={75}
                  step={5}
                  min={5}
                  max={995}
                  defaultValue={parseInt(set.weight)}
                  onChange={(value) =>
                    handleChange(
                      { target: { name: "weight", value: value } },
                      exerciseIndex,
                      setIndex
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ));

  return (
    <>
      {Tables}
      {/* {templateState.exercises.map((exercise, index) => (
        <Container key={exercise.exerciseName}>
          <Group mt={5}>
            <Text
              size="xl"
              sx={(theme) => ({ color: theme.primaryColor })}
              fw={700}
            >
              {exercise.exerciseName}
            </Text>
          </Group>

          <Flex wrap={true} gap={10}>
            <NumberInput
              label="Sets"
              value={parseInt(exercise.sets)}
              onChange={(value) =>
                handleChange({ target: { name: "sets", value: value } }, index)
              }
            />

            

            {exercise.weight !== "Body weight" ? (
             
            ) : null}
          </Flex>
        </Container>
      ))} */}
    </>
  );
}
