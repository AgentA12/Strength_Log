import { Stack, Text, RingProgress, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useInterval } from "@mantine/hooks";

export default function Resting({ restTime, handleContinue }) {
  const [seconds, setSeconds] = useState(restTime);

  let minutes = Math.floor(seconds / 60);
  let secondsRemaining = seconds - minutes * 60;
  let percentage = Math.floor((seconds / restTime) * 100);

  const interval = useInterval(() => {
    setSeconds((s) => s - 1);
  }, 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  if (seconds <= 0) {
    return (
      <>
        <RingProgress
          size={200}
          label={
            <Stack align="center">
              <Text size="sm" ta="center" color="green">
                Rest Complete
              </Text>
            </Stack>
          }
          thickness={4}
          sections={[{ value: 100, color: "green" }]}
        />
        <Button onClick={handleContinue}>Continue</Button>
      </>
    );
  }

  return (
    <Stack align="center">
      <RingProgress
        size={200}
        label={
          <Stack align="center">
            <Text size="sm" ta="center">
              Resting
            </Text>
            <Text>
              {minutes > 0 ? `${minutes} min` : null}{" "}
              {secondsRemaining === 0 ? 60 : secondsRemaining} secs
            </Text>
          </Stack>
        }
        thickness={4}
        sections={[{ value: percentage, color: "teal" }]}
      />
      <Button onClick={handleContinue}>Skip</Button>
    </Stack>
  );
}
