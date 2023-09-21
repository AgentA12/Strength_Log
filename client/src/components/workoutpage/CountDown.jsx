import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";

export default function CountDown() {
  const [seconds, setSeconds] = useState(3);
  const [minutes, setMinutes] = useState(0);

  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  if (minutes <= 0 && seconds <= 0) {
    return <Text>Rest Complete</Text>;
  }

  if (seconds <= 0) {
    setSeconds(60);
    setMinutes((m) => m - 1);
  }

  if (minutes >= 60) {
    setMinutes(0);
  }

  return <Text>{`${minutes} min ${seconds} seconds`}</Text>;
}
