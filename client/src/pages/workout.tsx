import classes from "./css/workout.module.css";
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
import { ExerciseCard } from "../components/workoutpage/index";
import { useState, useEffect, useContext } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../utils/helpers/functions";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../utils/graphql/mutations";
import { UserContext } from "../contexts/userInfo";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { IconConfetti } from "@tabler/icons-react";
import { ExerciseShape } from "../types/template";

interface Exercise extends ExerciseShape {
  completed: boolean;
}

interface WorkoutState {
  exercises: Exercise[];
  timeToComplete: null | number;
  templateId: string;
  templateName: string;
  workoutFinished: boolean;
}

const startedOn = new Date();

export default function WorkoutPage() {
  const {
    state: { workout },
  } = useLocation();

  const userInfo = useContext(UserContext);

  const userID = userInfo?.data._id;

  const navigate = useNavigate();

  const theme = useMantineTheme();
  const primaryColor = theme.primaryColor;

  const [saveWorkout, { loading }] = useMutation(SAVE_WORKOUT);

  const [workoutState, setWorkoutState] = useState<WorkoutState>({
    ...workout,
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

  function handleChange(
    value: string,
    exerciseIndex: number,
    name: string,
    setIndex: number
  ) {
    const data = { ...workoutState };

    data.exercises[exerciseIndex].sets[setIndex][name] = value;
    data.exercises[exerciseIndex].sets[setIndex][name] = value;

    setWorkoutState(data);
  }

  function addSet(
    exercise: ExerciseShape,
    exerciseIndex: number,
    setIsResting: React.Dispatch<React.SetStateAction<boolean>>,
    setSetDone: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const data = { ...workoutState };

    // the set to add is just a copy of the last set completed
    const setToAdd = exercise.sets[exercise.sets.length - 1];

    data.exercises[exerciseIndex].completed = false;

    data.exercises[exerciseIndex].sets.push(setToAdd);

    setWorkoutState(data);
    setSetDone(false);
    setIsResting(true);
  }

  function handleExerciseComplete(exerciseIndex: number) {
    const data = { ...workoutState };

    data.exercises[exerciseIndex].completed = true;

    let isWorkoutDone = data.exercises.every((e) => e.completed === true);

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
        templateId: workoutState.templateId,
        userID: userID,
        exercises: workoutState.exercises,
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

  console.log(workoutState);

  return (
    <Container fluid>
      <Divider
        mb={10}
        label={
          <Group justify="center" gap="xs" align="center">
            <Title c={primaryColor}>Training </Title>
            <Title tt="capitalize" className={classes.dividertitle}>
              {workoutState.templateName}
            </Title>
          </Group>
        }
        variant="dashed"
      />
      <Stack gap={0} align="center" justify="center">
        Started on{" "}
        <Text c={workoutState.workoutFinished ? "green" : undefined}>
          {Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            year: "numeric",
          }).format(startedOn)}
        </Text>
        <Text
          mb={15}
          c={workoutState.workoutFinished ? "green" : undefined}
        >{`${hours}:${formatTime(minutes)}:${formatTime(seconds)}`}</Text>
        {workoutState.workoutFinished ? (
          <>
            <Group gap={5}>
              Workout Completed! <IconConfetti />
            </Group>

            <Button mt={10} color="green" onClick={handleFinish}>
              Finish and save
            </Button>
          </>
        ) : (
          <Flex direction="column" gap={15}>
            {workoutState.exercises.map(
              (exercise: ExerciseShape, exerciseIndex: number) => (
                <ExerciseCard
                  exerciseIndex={exerciseIndex}
                  template={workoutState}
                  exercise={exercise}
                  key={exercise.exercise._id}
                  handleChange={handleChange}
                  exerciseComplete={handleExerciseComplete}
                  addSet={addSet}
                />
              )
            )}
          </Flex>
        )}
      </Stack>
    </Container>
  );
}
