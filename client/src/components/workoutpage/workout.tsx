import classes from "./workout.module.css";
import {
  Title,
  Flex,
  Stack,
  Button,
  Text,
  Divider,
  Container,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { ExerciseCard } from "./index";
import { useState, useEffect, useContext } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../../utils/helpers/functions";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { UserContext } from "../../app";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";

export default function WorkoutPage() {
  const {
    state: { template },
  } = useLocation();

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const primaryColor = theme.primaryColor;

  const [saveWorkout, { loading }] = useMutation(SAVE_WORKOUT);

  const [workoutState, setWorkoutState] = useState({
    template: template,
    timeToComplete: null,
    workoutFinished: false,
  });

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    !workoutDone && interval.start();
    return interval.stop;
  }, [interval, workoutDone]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform actions before the component unloads
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!workoutDone) {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes((m) => m + 1);
    }

    if (minutes >= 60) {
      setMinutes(0);
      setHours((h) => h + 1);
    }
  }

  function handleChange(value, exerciseIndex, name, setIndex) {
    const data = { ...workoutState };

    data.template[exerciseIndex].sets[setIndex][name] = value;
    data.template[exerciseIndex].sets[setIndex][name] = value;

    setWorkoutState(data);
  }

  function addSet(exercise, exerciseIndex, setIsResting, setSetDone) {
    const data = { ...workoutState };

    // the set to add is just a copy of the last set completed
    const setToAdd = exercise.sets[exercise.sets.length - 1];

    data.template[exerciseIndex].completed = false;

    data.template[exerciseIndex].sets.push(setToAdd);

    setWorkoutState(data);
    setSetDone(false);
    setIsResting(true);
  }

  function exerciseComplete(exerciseIndex) {
    const data = { ...workoutState };

    data.template[exerciseIndex].completed = true;

    let isWorkoutDone = data.template.every((e) => e.completed === true);

    data.workoutFinished = isWorkoutDone;

    if (isWorkoutDone) {
      data.timeToComplete = seconds + minutes * 60 + hours * 3600;
      setWorkoutDone(true);
      interval.stop();
    }
    setWorkoutState(data);
  }

  function handleFinish() {
    saveWorkout({
      variables: {
        templateId: workoutState.template.templateId,
        userID: userID,
        exercises: workoutState.template,
      },
    })
      .then((res) => {
        if (res.data?.saveWorkout.username && !loading) {
          showNotification({
            title: `${res.data.saveWorkout.username} your template was saved!`,
            message: "Your workout will be recorded. 🥳",
            autoClose: 3000,
            icon: <AiOutlineCheck />,
          });
        }
      })
      .catch((error) => {
        showNotification({
          title: `Oops, there was an error while saving your template`,
          message: error.message,
          autoClose: 3000,
          icon: <BiErrorCircle />,
          color: "red",
        });
      });

    navigate("/Dashboard");
  }

  return (
    <Container fluid>
      <Divider
        mb={10}
        label={
          <Group justify="center" gap="xs" align="center">
            <Title c={primaryColor} className={classes.dividerTitle}>
              Training{" "}
            </Title>
            <Title tt="capitalize" className={classes.title}>
              {workoutState.template.templateName}
            </Title>
          </Group>
        }
        variant="dashed"
      />
      <Stack gap={0} align="center" justify="center">
        <Text c="dimmed" fz="xl">
          {new Date().toDateString()}
        </Text>
        <Text mb={12} c="dimmed" fz="lg">{`${hours}:${formatTime(
          minutes
        )}:${formatTime(seconds)}`}</Text>

        {workoutState.workoutFinished ? (
          <>
            <Text size="xl">Completed</Text>

            <Button mt={10} color="green" onClick={handleFinish}>
              Finish
            </Button>
          </>
        ) : (
          <Flex direction="column" gap={12}>
            {workoutState.template.map((exercise, exerciseIndex) => (
              <ExerciseCard
                exerciseIndex={exerciseIndex}
                template={workoutState.template}
                exercise={exercise}
                completed={exercise.completed}
                key={exercise.exercise._id}
                handleChange={handleChange}
                exerciseComplete={exerciseComplete}
                addSet={addSet}
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Container>
  );
}
