import { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEMPLATE, EDIT_TEMPLATE } from "../utils/graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  Box,
  Loader,
  Center,
  Stepper,
  Group,
  Stack,
} from "@mantine/core";
import {
  ConfirmForm,
  ExerciseInfoForm,
  SelectExerciseModal,
  TemplateInfoForm,
} from "../components/create&edittemplates";
import { GET_EXERCISES } from "../utils/graphql/queries";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router-dom";
import { UserContext, UserInfo } from "../contexts/userInfo";
import { useDisclosure } from "@mantine/hooks";
import { ExerciseDetailsShape, SetShape } from "../types/template";
import { IconArrowsLeft, IconArrowsRight } from "@tabler/icons-react";

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

    const exerciseExistsInForm = form.values.exercises?.find(
      (exercise: ExerciseDetailsShape) => exercise.exerciseName === value
    );

    if (exerciseExistsInForm) {
      close();
      return;
    }

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

  function removeExercise(index: number) {
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
              leftSection={<IconArrowsLeft size={15} />}
            >
              Go Back
            </Button>

            {active !== 2 ? (
              <Button
                disabled={form.values.exercises.length == 0 && active === 1}
                rightSection={<IconArrowsRight size={15} />}
                onClick={handleStepClick}
              >
                Next{" "}
              </Button>
            ) : null}
          </Group>

          <Stepper active={active}>
            <Stepper.Step label={<Text fw={600}>Template Info</Text>}>
              <TemplateInfoForm form={form} />
            </Stepper.Step>
            <Stepper.Step label={<Text fw={600}>Exercises</Text>}>
              <ExerciseInfoForm
                form={form}
                open={open}
                removeSet={removeSet}
                addSet={addSet}
                removeExercise={removeExercise}
              />
            </Stepper.Step>
            <Stepper.Step label={<Text fw={600}>Confirm</Text>}>
              <Stack align="center" gap={5} mb={10}>
                <Text fw={600} size="xl">
                  Look good?
                </Text>
                <Button
                  w={"fit-content"}
                  color="green.5"
                  loading={submitLoading || editTemplateLoading}
                  onClick={handleSubmit}
                  disabled={form.values.exercises.length < 1}
                >
                  Save Template
                </Button>
              </Stack>
              <ConfirmForm form={form} />
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
