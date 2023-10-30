import ExerciseForm from "./ExerciseForm";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ScrollArea,
  TextInput,
  Textarea,
  Divider,
  Text,
  Container,
  Title,
  Flex,
  Box,
  createStyles,
  Button,
} from "@mantine/core";
import { GET_EXERCISES } from "../../utils/graphql/queries";
import { useDisclosure } from "@mantine/hooks";
import { SelectExerciseModal } from "./index";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "600px",
  },
}));

export default function EditTemplate() {
  const { state } = useLocation();

  const { data, loading, error } = useQuery(GET_EXERCISES);

  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStyles();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState(state?.template);

  const [editTemplate, { loading: editTemplateLoading }] =
    useMutation(EDIT_TEMPLATE);

  if (loading) return null;

  if (error) {
    return null;
  }

  let exercises = data?.getAllExercises.map((e) => {
    return {
      value: e.exerciseName,
      label: e.exerciseName,
      _id: e._id,
      equipment: e.equipment,
    };
  });

  function handleChange(exerciseIndex, { target }) {
    let data = { ...formState };

    if (target.name === "restTime") {
      data.exercises[exerciseIndex][target.name] = target.value;
      setFormState({ ...data });
      return;
    } else if (
      target.name !== "templateName" &&
      target.name !== "templateNotes"
    ) {
      data.exercises[exerciseIndex].sets[target.setIndex][target.name] =
        target.value;

      setFormState({ ...data });
      return;
    } else {
      setFormState({ ...formState, [target.name]: target.value });
    }
  }

  function resetFormState() {
    setFormState({
      templateName: "",
      templateNotes: "",
      exercises: [],
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const mutationRes = await editTemplate({
        variables: {
          templateId: formState._id,
          templateName: formState.templateName,
          templateNotes: formState.templateNotes,
          exercises: formState.exercises,
        },
      });

      if (mutationRes) {
        //if template is added, reset form and refetch new templates and remove the error message
        resetFormState();
        // refetch();
        setErrorMessage(null);
        navigate("/Home");
      }
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    }
  }

  //adds an exercise to the form
  function addExercise(value) {
    const e = exercises.find((exercise) => exercise.value === value);

    const exercise = {
      exerciseName: value,
      _id: e._id,
      sets: [{ weight: 0, reps: 0 }],
    };

    const data = { ...formState };

    data.exercises.push(exercise);

    setFormState(data);

    close();
  }

  function addSet(exerciseIndex) {
    let data = { ...formState };

    data.exercises[exerciseIndex].sets.push({
      weight:
        data.exercises[exerciseIndex].sets[
          data.exercises[exerciseIndex].sets.length - 1
        ].weight,
      reps: data.exercises[exerciseIndex].sets[
        data.exercises[exerciseIndex].sets.length - 1
      ].reps,
    });

    setFormState(data);
  }

  function removeSet(index, i) {
    let data = { ...formState };

    data.exercises[index].sets = data.exercises[index].sets.filter(
      (_, x) => i !== x
    );

    setFormState(data);
  }

  function removeExercise(_, index) {
    let data = { ...formState };

    const filteredExercises = formState.exercises.filter((_, i) => {
      return i !== index;
    });

    data.exercises = filteredExercises;

    setFormState(data);
  }

  return (
    <Container component="main" fluid>
      <Divider
        my="lg"
        variant="dashed"
        label={<Title tt="capitalize">Edit Template</Title>}
      />

      <Box className={classes.container}>
        <TextInput
          onChange={(event) => handleChange(null, event)}
          name="templateName"
          value={formState?.templateName}
          placeholder="Template Name"
          size="xl"
          mb={15}
        />
        <Box>
          <Textarea
            minRows={10}
            onChange={(event) => handleChange(null, event)}
            name="templateNotes"
            placeholder="Template notes"
            value={formState?.templateNotes}
          />
          <Flex mt={10} justify={"space-between"}>
            <Button onClick={open}>Add Exercise</Button>
            <Button loading={loading} onClick={handleSubmit}>
              Save Template
            </Button>
          </Flex>
          <Text>{errorMessage && errorMessage}</Text>
        </Box>

        <SelectExerciseModal
          opened={opened}
          close={close}
          addExercise={addExercise}
          exercises={exercises}
        />

        <ScrollArea offsetScrollbars scrollbarSize={4} scrollHideDelay={1500}>
          {formState?.exercises.map((_, index) => (
            <ExerciseForm
              key={index}
              handleChange={handleChange}
              exerciseIndex={index}
              formState={formState}
              removeExercise={removeExercise}
              addSet={addSet}
              removeSet={removeSet}
            />
          ))}
        </ScrollArea>
      </Box>
    </Container>
  );
}
