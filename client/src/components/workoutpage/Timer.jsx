import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";
import { formatTime } from "../../utils/helpers/functions";

export default function Timer({ textSize }) {
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

  return (
    <Text fz={textSize ? textSize : "md"}>{`${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`}</Text>
  );
}
