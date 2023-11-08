import { Title, Flex, Stack, Button, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { ExerciseCard } from "../components/workoutpage/index";
import { useState, useEffect, useContext } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../utils/helpers/functions";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../utils/graphql/mutations";
import { UserContext } from "../app";
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

  const [saveWorkout, { loading, error }] = useMutation(SAVE_WORKOUT);

  const [workoutState, setWorkoutState] = useState({
    template: template,
    timeToComplete: null,
    workoutFinished: false,
  });

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  if (seconds >= 60) {
    setSeconds(0);
    setMinutes((m) => m + 1);
  }

  if (minutes >= 60) {
    setMinutes(0);
    setHours((h) => h + 1);
  }

  function handleChange(value, exerciseIndex, name, setIndex) {
    const data = { ...workoutState };

    data.template[exerciseIndex].sets[setIndex][name] = value;
    data.template[exerciseIndex].sets[setIndex][name] = value;

    setWorkoutState(data);
  }

  function exerciseComplete(exerciseIndex) {
    const data = { ...workoutState };

    data.template[exerciseIndex].completed = true;

    let isWorkoutDone = data.template.every((e) => e.completed === true);

    data.workoutFinished = isWorkoutDone;

    if (isWorkoutDone) {
      data.timeToComplete = seconds + minutes * 60 + hours * 3600;
      interval.toggle();
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

    navigate("/Home");
  }

  return (
    <Stack justify="center" spacing={1} align="center">
      <Title color={workoutState.workoutFinished && "green"} mt={5}>
        {workoutState.template.templateName}
      </Title>

      <Text c="dimmed" fz="lg">{`${hours}h:${formatTime(minutes)}m:${formatTime(
        seconds
      )}s`}</Text>

      {workoutState.workoutFinished ? (
        <>
          <Text sx={(theme) => ({ color: theme.colors.green[4] })} size="xl">
            Completed
          </Text>

          <Button mt={10} color="green" onClick={handleFinish}>
            Finish
          </Button>
        </>
      ) : (
        <Flex direction="column" gap={10}>
          {workoutState.template.map((exercise, exerciseIndex) => (
            <ExerciseCard
              exerciseIndex={exerciseIndex}
              template={workoutState.template}
              exercise={exercise}
              completed={exercise.completed}
              key={exercise.exercise._id}
              handleChange={handleChange}
              exerciseComplete={exerciseComplete}
            />
          ))}
        </Flex>
      )}
    </Stack>
  );
}
