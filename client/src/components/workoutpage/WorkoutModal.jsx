import {
  Stack,
  Modal,
  Title,
  ActionIcon,
  Menu,
  Button,
  RingProgress,
  Group,
  Text,
  NumberInput,
} from "@mantine/core";

import { IoIosOptions } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import CountDown from "./CountDown";
import { useState } from "react";
import Resting from "./Resting";

export default function WorkoutModal({
  opened,
  close,
  exercise,
  templateName,
  index,
}) {
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  function handleFinished() {
    if (currentSet < exercise.sets.length) {
      setIsResting(true);
      // setCurrentSet(currentSet + 1);
      // show rest time
    } else {
      // show complete component
    }
  }

  return (
    <Modal
      withCloseButton={false}
      fullScreen
      transitionProps={{ transition: "slide-up" }}
      opened={opened}
      onClose={close}
    >
      <Group position="apart">
        <Title
          tt="capitalize"
          component="span"
          variant="gradient"
          gradient={{ from: "#662D8C", to: " #ED1E79", deg: 90 }}
        >
          {templateName}
        </Title>
        <Button onClick={close}>Stop Exercise</Button>
      </Group>
      <Stack align="center" spacing={5} justify="center">
        <Title
          tt="capitalize"
          order={2}
          sx={(theme) => ({ color: theme.colors.brand[4] })}
          mt={5}
        >
          {exercise.exercise.exerciseName}
        </Title>
        <Text c="dimmed">{`Set ${currentSet} / ${exercise.sets.length}`}</Text>

        {isResting ? (
          <Resting setIsResting={setIsResting} isResting={isResting} />
        ) : (
          <>
            <Group justify="center" gap="xs" grow w="250px">
              <NumberInput
                ta="center"
                label={<Text>Reps</Text>}
                value={parseInt(5)}
              />
              <NumberInput
                ta="center"
                step={5}
                label={<Text>Weight (Lbs)</Text>}
                value={parseInt(225)}
              />
            </Group>
            <Button mt="md" onClick={handleFinished}>
              Set Done
            </Button>
          </>
        )}

        {/* <Stack align="center">
          <Text
            fw={500}
            size="xl"
            sx={(theme) => ({ color: theme.colors.green[5] })}
          >
            {`${5} / ${5}`} Sets Completed
          </Text>
          <Button size="md" w={175} p={0} leftIcon={<BsPlus size={20} />}>
            One More Set?
          </Button>
          <Button size="md" color="green" w={175}>
            Exercise Done
          </Button>
        </Stack> */}
      </Stack>
    </Modal>
  );
}
