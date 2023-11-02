import ExerciseForm from "./ExerciseForm";
import { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  ScrollArea,
  TextInput,
  Textarea,
  Divider,
  Container,
  Title,
  Text,
  Flex,
  createStyles,
  Box,
  Button,
} from "@mantine/core";
import { UserContext } from "../../App";
import { useDisclosure } from "@mantine/hooks";
import { SelectExerciseModal } from "./index";
import { GET_EXERCISES } from "../../utils/graphql/queries";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "600px",
  },
}));

export default function CreateTemplateContainer() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_EXERCISES);

  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStyles();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    initialValues: {
      templateName: "",
      templateNotes: "",
      exercises: [],
    },

    validate: {
      templateName: (value) =>
        value.trim().length ? null : "Please enter a template name",
      exercises: {
        sets: {
          weight: (value) => (value > 1 ? null : "Please enter a valid weight"),
          reps: (value) =>
            value > 1 ? null : "Please enter a valid number of reps",
        },
      },
    },
  });

  const [addTemplate, { loading: submitLoading, error: submitError }] =
    useMutation(CREATE_TEMPLATE);

  if (loading) return null;

  if (error) {
    return null;
  }

  let exercises = data.getAllExercises.map((e) => {
    return {
      value: e.exerciseName,
      label: e.exerciseName,
      _id: e._id,
      equipment: e.equipment,
    };
  });

  function handleChange(exerciseIndex, { target }) {
    let data = { ...form.values };

    if (target.name === "restTime") {
      data.exercises[exerciseIndex][target.name] = target.value;
      form.setValues({ ...data });
      return;
    } else if (
      target.name !== "templateName" &&
      target.name !== "templateNotes"
    ) {
      data.exercises[exerciseIndex].sets[target.setIndex][target.name] =
        target.value;
      form.setValues({ ...data });
      return;
    } else {
      form.setValues({ ...data, [target.name]: target.value });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(form.validate());
    if (!form.validate().hasErrors) {
      try {
        const mutationRes = await addTemplate({
          variables: {
            ...form.values,
            userId: userID,
          },
        });

        if (mutationRes) {
          showNotification({
            title: `${form.values.templateName} is ready`,
            message: "Your template was successfully created",
            autoClose: 3000,
          });
          navigate("/Home");
        }
      } catch (error) {
        if (error.message) {
          setErrorMessage(error.message);
        }
      }
    }
  }

  //adds an exercise to the form
  function addExercise(value) {
    const e = exercises.find((exercise) => exercise.value === value);

    const exercise = {
      exerciseName: value,
      _id: e._id,
      restTime: 180,
      sets: [{ weight: 135, reps: 8 }],
    };

    const data = { ...form.values };

    data.exercises.push(exercise);

    form.setValues({ ...data });

    close();
  }

  function addSet(exerciseIndex) {
    let data = { ...form.values };

    data.exercises[exerciseIndex].sets.push({
      weight:
        data.exercises[exerciseIndex].sets[
          data.exercises[exerciseIndex].sets.length - 1
        ].weight,
      reps: data.exercises[exerciseIndex].sets[
        data.exercises[exerciseIndex].sets.length - 1
      ].reps,
    });

    form.setValues({ ...data });
  }

  function removeSet(index, i) {
    let data = { ...form.values };

    data.exercises[index].sets = data.exercises[index].sets.filter(
      (_, x) => i !== x
    );

    form.setValues({ ...data });
  }

  function removeExercise(_, index) {
    let data = { ...form.values };

    const filteredExercises = form.values.exercises.filter((_, i) => {
      return i !== index;
    });

    data.exercises = filteredExercises;

    form.setValues({ ...data });
  }

  if (submitError) console.log(submitError);

  return (
    <Container component="main" fluid>
      <Divider
        my="lg"
        variant="dashed"
        label={<Title tt="capitalize">Create A Template</Title>}
      />
      <form>
        <Box className={classes.container}>
          <TextInput
            onChange={(event) => handleChange(null, event)}
            name="templateName"
            value={form.values.templateName}
            placeholder="Template Name"
            size="xl"
            mb={15}
            {...form.getInputProps("templateName")}
          />
          <Box>
            <Textarea
              minRows={10}
              onChange={(event) => handleChange(null, event)}
              name="templateNotes"
              placeholder="Template notes"
              value={form.values.templateNotes}
              {...form.getInputProps("templateNotes")}
            />
            <Flex mt={10} justify={"space-between"}>
              <Button onClick={open}>Add Exercise</Button>
              <Button
                type="submit"
                loading={submitLoading}
                onClick={handleSubmit}
              >
                Save Template
              </Button>
            </Flex>
            <Text>{errorMessage && errorMessage}</Text>
          </Box>

          <ScrollArea
            offsetScrollbars
            scrollbarSize={4}
            scrollHideDelay={1500}
            h={500}
          >
            {form.values?.exercises.map((_, exerciseIndex) => (
              <ExerciseForm
                key={Math.random() * 200}
                handleChange={handleChange}
                exerciseIndex={exerciseIndex}
                form={form}
                removeExercise={removeExercise}
                addSet={addSet}
                removeSet={removeSet}
              />
            ))}
          </ScrollArea>
        </Box>
      </form>
      <SelectExerciseModal
        opened={opened}
        close={close}
        addExercise={addExercise}
        exercises={exercises}
      />
    </Container>
  );
}
