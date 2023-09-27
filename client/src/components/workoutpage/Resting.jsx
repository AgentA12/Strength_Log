import { Stack, Text, RingProgress, Button } from "@mantine/core";
import CountDown from "./CountDown";
import { useState } from "react";

export default function Resting({ setIsResting, isResting }) {
  let restTime = 180;
  
  const [time, setTime] = useState(restTime);

  return (
    <Stack align="center">
      <RingProgress
        size={200}
        label={
          <Stack align="center">
            <Text size="sm" ta="center">
              Rest Time
            </Text>
            <CountDown timeInSeconds={time} />
          </Stack>
        }
        thickness={4}
        sections={[{ value: time, color: "brand" }]}
      />
      <Button>Skip</Button>
      <Button>Continue</Button>
    </Stack>
  );
}
