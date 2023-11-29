import classes from "./templatedashboard.module.css";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEMPLATE, EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Text,
  Textarea,
  Divider,
  Container,
  Title,
  Flex,
  Button,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SelectExerciseModal, ExerciseForm } from "./index";
import { GET_EXERCISES } from "../../utils/graphql/queries";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../app";

export default function TemplateDashBoard() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { state } = useLocation();

  const { data, loading } = useQuery(GET_EXERCISES);

  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: state
      ? { ...state.template }
      : { templateName: "", templateNotes: "", exercises: [] },

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

  const [addTemplate, { loading: submitLoading }] =
    useMutation(CREATE_TEMPLATE);

  const [editTemplate, { loading: editTemplateLoading }] =
    useMutation(EDIT_TEMPLATE);

  if (loading) return null;

  const exercises = data.getAllExercises.map((e) => {
    return {
      value: e.exerciseName,
      label: e.exerciseName,
      _id: e._id,
      equipment: e.equipment,
    };
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.validate().hasErrors) {
      try {
        let mutationRes;

        if (state) {
          mutationRes = await editTemplate({
            variables: {
              ...form.values,
            },
          });
        } else {
          mutationRes = await addTemplate({
            variables: {
              ...form.values,
              userId: userID,
            },
          });
        }

        if (mutationRes) {
          showNotification({
            title: `${form.values.templateName} is ready`,
            message: "Your template was successfully created",
            autoClose: 3000,
          });
          navigate("/DashBoard");
        }
      } catch (error) {
        if (error.message) {
          form.setFieldError("templateName", error.message);
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

  return (
    <Box>
      <Container>
        <Divider
          my="xs"
          labelPosition="left"
          variant="dashed"
          label={
            <Title className={classes.title} order={2} tt="capitalize">
              {state ? `Edit ${form.values.templateName}` : "Create a template"}
            </Title>
          }
        />
        <form>
          <TextInput
            label={<Text>Template Name</Text>}
            name="templateName"
            value={form.values.templateName}
            mb={15}
            {...form.getInputProps("templateName")}
          />

          <Textarea
            minRows={5}
            name="templateNotes"
            label={<Text>Template Notes</Text>}
            value={form.values.templateNotes}
            {...form.getInputProps("templateNotes")}
          />
          <Flex mt={10} justify="space-between">
            <Button
              type="submit"
              mb={15}
              loading={submitLoading || editTemplateLoading}
              onClick={handleSubmit}
            >
              Save Template
            </Button>
          </Flex>

          <Flex direction="column">
            <Flex align="center" wrap="wrap" gap={20}>
              <Title>Exercises</Title>
              <Button onClick={open}>Add Exercise</Button>
            </Flex>
            {form.values.exercises.map((_, exerciseIndex) => (
              <ExerciseForm
                key={uuidv4()}
                exerciseIndex={exerciseIndex}
                form={form}
                removeExercise={removeExercise}
                addSet={addSet}
                removeSet={removeSet}
              />
            ))}
          </Flex>
        </form>
        <SelectExerciseModal
          opened={opened}
          close={close}
          addExercise={addExercise}
          exercises={exercises}
        />
      </Container>
    </Box>
  );
}
