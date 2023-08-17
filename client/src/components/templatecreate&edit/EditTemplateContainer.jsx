import ExerciseForm from "./ExerciseForm";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import AddExerciseBtn from "../homepage/AddExerciseBtn";
import SaveTemplateBtn from "../homepage/SaveTemplateBtn";
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
} from "@mantine/core";
import { UserContext } from "../../App";
import { useContext } from "react";

const useStyles = createStyles(() => ({
  container: {
    maxWidth: "600px",
  },
}));

export default function EditTemplate() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState(state.template);

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { loading, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [EditTemplate] = useMutation(EDIT_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName" && target.name !== "templateNotes") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      if (!formState.templateName.trim()) {
        setErrorMessage("You must enter a template name");
        return;
      }

      for (let i = 0; i < formState.exercises.length; i++) {
        if (
          !formState.exercises[i].exerciseName ||
          !formState.exercises[i].sets ||
          !formState.exercises[i].reps
        ) {
          setErrorMessage("You must fill in all exercise fields");
          return;
        }
      }

      const mutationRes = await EditTemplate({
        variables: {
          ...formState,
          userId: userID,
        },
      });

      if (mutationRes) {
        refetch();
        navigate("/Home");
      }
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    }
  }

  function addExercise() {
    const exercise = {
      exerciseName: "",
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

    const filteredExercises = formState.exercises.filter((_, i) => i !== index);

    data.exercises = filteredExercises;

    setFormState(data);
  }

  return (
    <Container component="main" fluid>
      <Divider
        my="lg"
        variant="dashed"
        label={
          <Title>
            Edit <Text component="span">{formState.templateName}</Text>
          </Title>
        }
      />
      <Box className={classes.container}>
        <TextInput
          size="xl"
          onChange={(event) => handleChange(null, event)}
          name="templateName"
          value={formState?.templateName}
          placeholder="Template Name"
        />

        <Box>
          <Textarea
            onChange={(event) => handleChange(null, event)}
            name="templateNotes"
            minRows={10}
            mt={10}
            placeholder="Template notes"
            value={formState?.templateNotes}
          />
          <Flex mt={5} justify={"space-between"}>
            <AddExerciseBtn addExercise={addExercise} />
            <SaveTemplateBtn loading={loading} handleSubmit={handleSubmit} />
          </Flex>
          <Text color="red"> {errorMessage ? errorMessage : null}</Text>
        </Box>
        <ScrollArea offsetScrollbars scrollbarSize={4} scrollHideDelay={1500}>
          <form onSubmit={(event) => handleSubmit(event)}>
            {formState?.exercises.map((_, index) => (
              <ExerciseForm
                key={index}
                handleChange={handleChange}
                index={index}
                formState={formState}
                removeExercise={removeExercise}
              />
            ))}
          </form>
        </ScrollArea>
      </Box>
    </Container>
  );
}
