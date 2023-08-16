import { IoMdRemove } from "react-icons/io";
import { NumberInput, Select, Card, Button, Title } from "@mantine/core";

const exerciseData = [
  { label: "bench press", value: "bench press" },
  { label: "close grip bench press", value: "clse grip bench press" },

  { label: "tricep push down", value: "tricep push down" },

  { label: "push up", value: "push up" },

  { label: "cable chest fly", value: "cable chest fly" },

  { label: "squat", value: "squat" },

  { label: "deadlift", value: "deadlift" },

  { label: "overhead press", value: "overhead press" },

  { label: "hip thrust", value: "hip thrust" },

  { label: "romanian deadlift", value: "romanian deadlift" },

  { label: "incline dumbell press", value: "incline dumbell press" },

  { label: "Pull up", value: "Pull up" },

  { label: "lat pull down", value: "lat pull down" },

  { label: "dumbell row", value: "dumbell row" },

  { label: "leg press", value: "leg press" },

  { label: "face pull", value: "face pull" },

  { label: "bicep curl", value: "bicep curl" },

  { label: "tricep extension", value: "tricep extension" },

  { label: "barbell row", value: "barbell row" },
];
export default function ExerciseForm({
  handleChange,
  index,
  formState,
  removeExercise,
}) {
  return (
    <Card withBorder my={10}>
      <Title order={2}>Exercise {index + 1}</Title>
      <Select
        onChange={(value) =>
          handleChange(index, {
            target: { name: "exerciseName", value: value },
          })
        }
        searchable
        label="Exercise Name"
        value={formState.exercises[index].exerciseName}
        data={exerciseData}
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
