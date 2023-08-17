import {
  Flex,
  Title,
  Button,
  createStyles,
  Paper,
  Text,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "../components/workoutpage/index.js";

import {} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: 500,
    position: "relative",
    overflow: "hidden",
    boxShadow: theme.shadows.xl,
  
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },
}));

export default function WorkoutPage() {
  const { classes } = useStyles();
  const [time, setTime] = useState({
    sec: 0,
    min: 0,
    hr: 0,
  });

  const { state } = useLocation();

  console.log(state);

  const [intervalId, setIntervalId] = useState();

  const updateTimer = () => {
    setTime((prev) => {
      let newTime = { ...prev };
      // update sec and see if we need to increase min
      if (newTime.sec < 59) newTime.sec += 1;
      else {
        newTime.min += 1;
        newTime.sec = 0;
      }
      // min has increased in *newTime* by now if it was updated, see if it has crossed 59
      if (newTime.min === 60) {
        newTime.min = 0;
        newTime.hr += 1;
      }

      return newTime;
    });
  };

  const startTimer = () => {
    if (!intervalId) {
      let id = setInterval(updateTimer, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId("");
    }
  };

  const finishTimer = () => {
    clearInterval(intervalId);
    console.log("workout finished", time);
  };

  return (
    <>
      <Title>{state.template.templateName}</Title>
      {!intervalId ? <Button onClick={startTimer}>Start workout</Button> : null}

      <Button onClick={finishTimer}>Finish</Button>

      <Text>{`${time.hr < 10 ? 0 : ""}${time.hr}:${time.min < 10 ? 0 : ""}${
        time.min
      }:${time.sec < 10 ? 0 : ""}${time.sec}`}</Text>

      <Text size={30} fw={1}>
        Exercises
      </Text>
      {state.template.exercises.map((exercise) => (
        <Paper withBorder radius="sm" className={classes.card}>
          <Flex>
            <Text size="xl" weight={500}>
              {exercise.exerciseName}
            </Text>
            <Button>Start</Button>
          </Flex>

          <Table exercise={exercise} />
        </Paper>
      ))}
    </>
  );
}
