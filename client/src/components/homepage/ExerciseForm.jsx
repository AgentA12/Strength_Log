import { IoMdRemove } from "react-icons/io";
import {
  TextInput,
  NumberInput,
  Select,
  Card,
  Button,
  Title,
} from "@mantine/core";

export default function ExerciseForm({
  handleChange,
  index,
  formState,
  removeExercise,
}) {
  return (
    <Card withBorder my={10}>
      <Title order={2}>Exercise {index + 1}</Title>
      <TextInput
        onChange={(event) => handleChange(index, event)}
        name="exerciseName"
        label="Name"
        value={formState.exercises[index].exerciseName}
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
      <Select
        label="Type"
        defaultValue={"Barbell"}
        value={formState.exercises[index].type}
        onChange={(value) =>
          handleChange(index, { target: { name: "type", value: value } })
        }
        data={[
          { value: "Barbell", label: "Barbell" },
          { value: "Dumbell", label: "Dumbell" },
          { value: "Cable", label: "Cable" },
          { value: "Body Weight", label: "Body Weight" },
          { value: "Other", label: "Other" },
        ]}
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
