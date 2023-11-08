import ExerciseForm from "./ExerciseForm";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEMPLATE, EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  ScrollArea,
  TextInput,
  Textarea,
  Divider,
  Container,
  Title,
  Flex,
  createStyles,
  Box,
  Button,
} from "@mantine/core";
import { UserContext } from "../../app";
import { useDisclosure } from "@mantine/hooks";
import { SelectExerciseModal } from "./index";
import { GET_EXERCISES } from "../../utils/graphql/queries";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "600px",
  },
}));

export default function TemplateDashBoard() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { state } = useLocation();

  const { data, loading } = useQuery(GET_EXERCISES);

  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStyles();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: state
      ? { ...state.template }
      : { templateName: "", templateNotes: "", exercises: [] },

    validate: {
      templateName: (value) =>
        value.trim().length ? null : "Please enter a template name",
      exercises: (value) => {
        return value.length ? null : "You must add at lease one exercise";
      },
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
          console.log("edit template is called");
          mutationRes = await editTemplate({
            variables: {
              ...form.values,
            },
          });
        } else {
          console.log("add template is called");

          mutationRes = await addTemplate({
            variables: {
              ...form.values,
              userId: userID,
            },
          });
        }

        if (mutationRes) {
          console.log(mutationRes);
          showNotification({
            title: `${form.values.templateName} is ready`,
            message: "Your template was successfully created",
            autoClose: 3000,
          });
          navigate("/Home");
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
    <Container component="main" fluid>
      <Divider
        my="lg"
        variant="dashed"
        label={
          <Title tt="capitalize">
            {state ? `Edit template` : "Create template"}
          </Title>
        }
      />
      <form>
        <Box className={classes.container}>
          <TextInput
            label="Template Name"
            name="templateName"
            value={form.values.templateName}
            mb={15}
            withAsterisk
            {...form.getInputProps("templateName")}
          />
          <Box>
            <Textarea
              minRows={5}
              name="templateNotes"
              label="Template Notes"
              value={form.values.templateNotes}
              {...form.getInputProps("templateNotes")}
            />
            <Flex mt={10} justify={"space-between"}>
              <Button onClick={open}>Add Exercise</Button>
              <Button
                type="submit"
                loading={submitLoading || editTemplateLoading}
                onClick={handleSubmit}
              >
                Save Template
              </Button>
            </Flex>
          </Box>

          <ScrollArea
            offsetScrollbars
            scrollbarSize={4}
            scrollHideDelay={1500}
            h={500}
          >
            {form.values.exercises.map((_, exerciseIndex) => (
              <ExerciseForm
                key={Math.random() * 200}
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
