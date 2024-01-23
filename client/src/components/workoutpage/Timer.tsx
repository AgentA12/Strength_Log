import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../../utils/helpers/functions";
import { ExerciseShape } from "../../types/template";

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


interface Props {
  textSize: string;
  workoutState: WorkoutState;
  setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
}

export default function Timer({
  textSize,
  workoutState,
  setWorkoutState,
}: Props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  if (workoutState.workoutFinished) {
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
