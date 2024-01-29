import { useState } from "react";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEMPLATE, EDIT_TEMPLATE } from "../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Text,
  Textarea,
  Container,
  Flex,
  Button,
  Box,
  Loader,
  Center,
  Fieldset,
  Stepper,
  Group,
  Stack,
  useMantineTheme,
  Paper,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  ExerciseForm,
  SelectExerciseModal,
} from "../components/create&edittemplates";
import { GET_EXERCISES } from "../utils/graphql/queries";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import { UserContext, UserInfo } from "../contexts/userInfo";
import { useDisclosure } from "@mantine/hooks";
import { SetShape } from "../types/template";

interface Exercise {
  exerciseName: String;
  _id: String;
  equipment: String;
  sets: SetShape[];
  restTime: number;
}

interface Exerciseform {
  value: string;
  label: string;
  _id: string;
  equipment: string;
}

export default function CreateTemplatePage() {
  const [active, setActive] = useState(0);

  const userInfo = useContext<UserInfo>(UserContext);
  const userID = userInfo?.data?._id;

  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_EXERCISES);
  const { state } = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: state
      ? { ...state.template }
      : { templateName: "", templateNotes: "", exercises: [] },

    validate: {
      templateName: (value) =>
        value.trim().length ? null : "You must enter a template name",

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

  if (loading) return <Loader />;

  const exercises = data.getAllExercises.map((e: Exercise) => {
    return {
      value: e.exerciseName,
      label: e.exerciseName,
      _id: e._id,
      equipment: e.equipment,
    };
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (form.validate().hasErrors) return;

    try {
      state
        ? await editTemplate({ variables: { ...form.values } })
        : await addTemplate({ variables: { ...form.values, userId: userID } });

      showNotification({
        title: `${form.values.templateName} is ready`,
        message: "Your template was successfully created",
        autoClose: 3000,
      });

      navigate("/dashboard");
    } catch (error: any) {
      if (error.message) form.setFieldError("templateName", error.message);
    }
  }

  function addExercise(value: string) {
    const e = exercises.find(
      (exercise: Exerciseform) => exercise.value === value
    );

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

  function addSet(exerciseIndex: number) {
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

  function removeSet(index: number, i: number) {
    let data = { ...form.values };

    data.exercises[index].sets = data.exercises[index].sets.filter(
      (_: any, x: number) => i !== x
    );

    form.setValues({ ...data });
  }

  function removeExercise(_: any, index: number) {
    let data = { ...form.values };

    const filteredExercises = form.values.exercises.filter(
      (_: any, i: number) => {
        return i !== index;
      }
    );

    data.exercises = filteredExercises;

    form.setValues({ ...data });
  }

  function handleStepClick() {
    switch (active) {
      case 0:
        if (form.validateField("templateName").hasError) {
          return;
        }
        break;
      case 1:
        if (form.values.exercises.length === 0 || form.validate().hasErrors) {
          return;
        }
    }

    nextStep();
  }

  return (
    <Center>
      <Box>
        <Text size="xxl" fw="bolder" ta="center">
          Create a template
        </Text>
        <>
          <Group justify="center" my="md">
            <Button
              disabled={active === 0}
              variant="default"
              onClick={prevStep}
            >
              Back
            </Button>

            {active === 2 ? (
              <Button
                color="green.5"
                loading={submitLoading || editTemplateLoading}
                onClick={handleSubmit}
                disabled={form.values.exercises.length < 1}
              >
                Save Template
              </Button>
            ) : (
              <Button onClick={handleStepClick}>Next {"=>"}</Button>
            )}
          </Group>

          <Stepper active={active}>
            <Stepper.Step label={<Text fw={600}>Template Info</Text>}>
              <FormOne form={form} />
            </Stepper.Step>
            <Stepper.Step label={<Text fw={600}>Exercises</Text>}>
              <FormTwo
                form={form}
                open={open}
                removeSet={removeSet}
                addSet={addSet}
                removeExercise={removeExercise}
              />
            </Stepper.Step>
            <Stepper.Step label={<Text fw={600}>Confirm</Text>}>
              <Text fw={600} ta="center" mb={20} size="xl">
                Look good?
              </Text>
              <FormThree form={form} />
            </Stepper.Step>
          </Stepper>
        </>
      </Box>
      <SelectExerciseModal
        opened={opened}
        close={close}
        addExercise={addExercise}
        exercises={exercises}
      />
    </Center>
  );
}

function FormOne({ form }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Fieldset>
        <Stack justify="center">
          <Box>
            <TextInput
              withAsterisk
              label="Template Name"
              name="templateName"
              {...form.getInputProps("templateName")}
            />
          </Box>
          <Box>
            <Textarea
              label="Template Notes"
              minRows={5}
              name="templateNotes"
              {...form.getInputProps("templateNotes")}
            />
          </Box>
        </Stack>
      </Fieldset>
    </motion.div>
  );
}
function FormTwo({ form, open, removeSet, addSet, removeExercise }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Flex direction="column">
        <Flex
          align="center"
          direction="column"
          justify="space-around"
          wrap="wrap"
          gap={2}
        >
          <Button onClick={open}>Add Exercise</Button>
        </Flex>
        {form.values.exercises.map(
          (exercise: Exercise, exerciseIndex: number) => (
            <Box maw={475} key={exercise._id as string}>
              <ExerciseForm
                exerciseIndex={exerciseIndex}
                form={form}
                removeExercise={removeExercise}
                addSet={addSet}
                removeSet={removeSet}
              />
            </Box>
          )
        )}
      </Flex>
    </motion.div>
  );
}

function FormThree({ form }: any) {
  const { primaryColor } = useMantineTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Stack align="center" gap={5}>
        <Text size="xxl" fw={700} tt="capitalize">
          {form.values.templateName}
        </Text>
        <Text size="md">
          {form.values.templateNotes.trim()
            ? form.values.templateNotes
            : "No notes"}
        </Text>

        {form.values.exercises.map((exercise: Exercise) => (
          <Stack
            gap={0}
            justify="center"
            align="center"
            key={exercise._id as string}
          >
            <Text size="xl" tt="capitalize" fw={500} c={`${primaryColor}.5`}>
              {exercise.exerciseName}
            </Text>
            <Text>{exercise.sets.length} Set</Text>
            <Text c="dimmed" fw={300}>
              Rest: {exercise.restTime}
            </Text>

            {exercise.sets.map((set: SetShape) => (
              <Text c="dimmed">
                {set.reps} x {set.weight} Lbs
              </Text>
            ))}
          </Stack>
        ))}
      </Stack>
    </motion.div>
  );
}
