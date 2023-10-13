import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../../utils/helpers/functions";

export default function Timer({ textSize, workoutState, setWorkoutState }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  if (workoutState.workoutFinished) {
    console.log("rendered")
    let data = { ...workoutState };

    data.timeToComplete = seconds + minutes * 60 + hours * 3600;
    setWorkoutState(data);
  }

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  if (seconds >= 60) {
    setSeconds(0);
    setMinutes((m) => m + 1);
  }

  if (minutes >= 60) {
    setMinutes(0);
    setHours((h) => h + 1);
  }

  return (
    <Text c="dimmed" fz={textSize ? textSize : "lg"}>{`${hours}h:${formatTime(
      minutes
    )}m:${formatTime(seconds)}s`}</Text>
  );
}
