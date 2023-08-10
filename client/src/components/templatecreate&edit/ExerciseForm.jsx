import { IoMdRemove } from "react-icons/io";
import { NumberInput, Select, Card, Button, Title } from "@mantine/core";

export default function ExerciseForm({
  handleChange,
  index,
  formState,
  removeExercise,
  exerciseData,
}) {
  if (exerciseData) {
    const exercises = exerciseData?.getExercises.map(({ name }) => {
      return { label: name, value: name };
    });

    return (
      <Card withBorder my={10}>
        <Title order={2}>Exercise {index + 1}</Title>
        <Select
          onChange={(value) =>
            handleChange(index, { target: { name: "name", value: value } })
          }
          label="Exercise Name"
          value={formState.exercises[index].value}
          data={exercises}
          maxDropdownHeight={180}
        />

        <NumberInput
          label="Weight (Lbs)"
          step={5}
          onChange={(value) =>
            handleChange(index, {
              target: {
                name: "weight",
                value: value,
              },
            })
          }
          value={
            formState.exercises[index].type === "Body Weight"
              ? 0
              : parseInt(formState.exercises[index].weight)
          }
        />
        <NumberInput
          label="Reps"
          onChange={(value) =>
            handleChange(index, {
              target: { name: "reps", value: value },
            })
          }
          value={parseInt(formState.exercises[index].reps)}
        />
        <NumberInput
          label="Sets"
          onChange={(value) =>
            handleChange(index, { target: { name: "sets", value: value } })
          }
          value={parseInt(formState.exercises[index].sets)}
        />

        {/* if rendering the first exercise, dont show the remove exercise button */}
        {index !== 0 ? (
          <Button
            onClick={(event) => removeExercise(event, index)}
            rightIcon={<IoMdRemove color="" />}
            variant="outline"
            color="red"
          >
            Remove Exercise
          </Button>
        ) : null}
      </Card>
    );
  }
}
