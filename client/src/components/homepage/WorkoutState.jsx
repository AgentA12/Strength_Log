import {
  Container,
  Text,
  Table,
  useMantineTheme,
  NumberInput,
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

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
    <Container mb={10} key={exercise._id}>
      <Text tt="capitalize" fz={23} fw="normal" color={theme.colors.brand[4]} mt={10}>
        {exercise.exercise.exerciseName}
      </Text>
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {exercise.sets.map((set, setIndex) => (
            <tr key={uuidv4()}>
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

  return Tables;
}
