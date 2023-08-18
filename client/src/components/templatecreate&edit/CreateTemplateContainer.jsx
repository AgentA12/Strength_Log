import ExerciseForm from "./ExerciseForm";
import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import AddExerciseBtn from "../homepage/AddExerciseBtn";
import SaveTemplateBtn from "../homepage/SaveTemplateBtn";
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
} from "@mantine/core";
import { UserContext } from "../../App";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "600px",
  },
}));

export default function CreateTemplateContainer() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { classes } = useStyles();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState({
    templateName: "",
    templateNotes: "",
    exercises: [
      {
        exerciseName: "",
        sets: 0,
        reps: 0,
        weight: 0,
      },
    ],
  });

  const [addTemplate, { loading: createTemplateLoading }] =
    useMutation(CREATE_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName" && target.name !== "templateNotes") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  function resetFormState() {
    setFormState({
      templateName: "",
      templateNotes: "",
      exercises: [
        {
          exerciseName: "",
          sets: 0,
          reps: 0,
          weight: 0,
        },
      ],
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const mutationRes = await addTemplate({
        variables: {
          ...formState,
          userId: userID,
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
  function addExercise() {
    const exercise = {
      exerciseName: "Bench press",
      sets: 5,
      reps: 5,
      weight: 135,
    };

    const data = { ...formState };

    data.exercises.push(exercise);

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
        label={<Title>Create A Template</Title>}
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
            <AddExerciseBtn addExercise={addExercise} />
            <SaveTemplateBtn
              loading={createTemplateLoading}
              handleSubmit={handleSubmit}
            />
          </Flex>
          <Text>{errorMessage && errorMessage}</Text>
        </Box>

        <ScrollArea offsetScrollbars scrollbarSize={4} scrollHideDelay={1500}>
          <>
            {formState?.exercises.map((_, index) => (
              <ExerciseForm
                key={index}
                handleChange={handleChange}
                index={index}
                formState={formState}
                removeExercise={removeExercise}
              />
            ))}
          </>
        </ScrollArea>
      </Box>
    </Container>
  );
}
