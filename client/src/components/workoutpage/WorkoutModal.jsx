import {
  Stack,
  Modal,
  Title,
  Button,
  Group,
  Text,
  NumberInput,
} from "@mantine/core";

import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import Resting from "./Resting";

export default function WorkoutModal({
  opened,
  close,
  exercise,
  templateName,
  handleChange,
  exerciseIndex,
  exerciseComplete,
}) {
  const [currentSet, setCurrentSet] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [setDone, setSetDone] = useState(false);

  function handleSetFinished() {
    if (currentSet !== exercise.sets.length - 1) {
      setIsResting(true);
    } else {
      setSetDone(true);
    }
  }

  function handleContinue() {
    setCurrentSet(currentSet + 1);
    setIsResting(false);
  }

  return (
    <Modal
      withCloseButton={false}
      fullScreen
      transitionProps={{ transition: "slide-up" }}
      opened={opened}
      onClose={close}
    >
      <Group justify="space-between">
        <Title tt="capitalize" component="span">
          {templateName}
        </Title>
        <Button onClick={close}>Stop Exercise</Button>
      </Group>
      <Stack align="center">
        <Title tt="capitalize" order={3} mt={30}>
          {exercise.exercise.exerciseName}
        </Title>

        {setDone ? (
          <>
            <Text fw={500}>
              {`${exercise.sets.length} / ${exercise.sets.length}`} Sets
              Completed
            </Text>
            <Button size="md" w={175} p={0} leftSection={<BsPlus size={20} />}>
              One More Set?
            </Button>
            <Button
              size="md"
              color="green"
              w={175}
              onClick={() => {
                close();
                exerciseComplete(exerciseIndex);
              }}
            >
              Done
            </Button>
          </>
        ) : (
          <>
            <Text c="dimmed">{`Set ${currentSet + 1} / ${
              exercise.sets.length
            }`}</Text>

            {isResting ? (
              <Resting
                setIsResting={setIsResting}
                handleContinue={handleContinue}
                restTime={exercise.restTime}
              />
            ) : (
              <>
                <Group justify="center" gap="xs" grow="true" w="250px">
                  <NumberInput
                    ta="center"
                    label={<Text>Reps</Text>}
                    value={exercise.sets[currentSet].reps}
                    onChange={(value) =>
                      handleChange(value, exerciseIndex, "reps", currentSet)
                    }
                  />

                  <NumberInput
                    ta="center"
                    step={5}
                    label={<Text>Weight (Lbs)</Text>}
                    value={exercise.sets[currentSet].weight}
                    onChange={(value) =>
                      handleChange(value, exerciseIndex, "weight", currentSet)
                    }
                  />
                </Group>
                <Button mt="md" onClick={handleSetFinished}>
                  Set Done
                </Button>
              </>
            )}
          </>
        )}
      </Stack>
    </Modal>
  );
}
