import { IoMdRemove } from "react-icons/io";
import { motion } from "framer-motion";
import {
  TextInput,
  NumberInput,
  Select,
  Card,
  Text,
  Button,
} from "@mantine/core";

export default function ExerciseForm({
  handleChange,
  index,
  formState,
  removeExercise,
}) {
  return (
    <motion.div
      layout
      initial={{ x: 0, y: -35, opacity: 0 }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ type: "", damping: 40, stiffness: 900 }}
      className="p-3"
    >
      <Card withBorder className="">
        {" "}
        <div className="w-full">
          <TextInput
            onChange={(event) => handleChange(index, event)}
            name="exerciseName"
            label={`Exercise Name - ${index + 1}`}
            className="mb-5"
            value={formState.exercises[index].exerciseName}
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-3 pb-4 ">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <NumberInput
              label="Weight (Lbs)"
              // the character 'e' is a valid number input for exponents and '.' for decimals, this logic with prevent that.
              onKeyDown={(event) => event.keyCode !== 69}
              // Mantine onChange events dont use "event" but extract the "value" prop out of event, so I needed to create a sudo target object for number inputs (this only happens with number inputs)
              onChange={(value) =>
                handleChange(index, {
                  target: { name: "weight", value: value },
                })
              }
              value={parseInt(formState.exercises[index].weight)}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div className="relative">
              <NumberInput
                label="Reps"
                onChange={(value) =>
                  handleChange(index, {
                    target: { name: "reps", value: value },
                  })
                }
                value={parseInt(formState.exercises[index].reps)}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <NumberInput
              label="Sets"
              onChange={(value) =>
                handleChange(index, { target: { name: "sets", value: value } })
              }
              value={parseInt(formState.exercises[index].sets)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between bg-inherit">
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
              rightIcon={<IoMdRemove color="white" />}
              variant="outline"
             className="text-red-400 border-red-400"
            >
              Remove Exercise
            </Button>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}

/* <select
          onChange={(event) => handleChange(index, event)}
          name="type"
          defaultValue={"Barbell"}
          value={formState.exercises[index].type}
        >
          <option hidden className="text-gray-600 bg-inherit">
            Type
          </option>
          <option className="bg-inherit" value="Barbell">
            Barbell
          </option>
          <option value="Dumbell">Dumbell</option>
          <option value="Machine">Machine</option>
          <option value="Cable">Cable</option>
          <option value="Body weight">Body weight</option>
          <option value="Other">Other</option>
        </select> **/
