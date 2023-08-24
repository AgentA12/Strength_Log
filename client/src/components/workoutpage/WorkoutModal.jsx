import {
  useMantineTheme,
  Stack,
  Modal,
  Title,
  ActionIcon,
  Menu,
  NumberInput,
  rem,
  Button,
  Text,
  Group,
} from "@mantine/core";

import Timer from "./Timer";
import { IoIosOptions } from "react-icons/io";
import { useRef, useState } from "react";

export default function WorkoutModal({
  opened,
  close,
  exercise,
  templateName,
}) {
  const theme = useMantineTheme();

  const currentSet = 1;
  const totalSets = exercise.sets;

  const [weight, setWeight] = useState(exercise.weight);
  const [reps, setReps] = useState(exercise.reps);

  const weightHandler = useRef();
  const repHandler = useRef();

  return (
    <Modal
      withCloseButton={false}
      fullScreen
      transitionProps={{ transition: "slide-up" }}
      opened={opened}
      onClose={close}
    >
      <Group position="apart">
        <Title component="span" color={theme.primaryColor}>
          {templateName}
        </Title>
        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon size="md">
              <IoIosOptions size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={close} color="green">
              Finish Exercise
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item onClick={close} color="red">
              Stop Exercise
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Stack align="center" justify="center">
        <Title mt={15}>{exercise.exercise.exerciseName.toUpperCase()}</Title>
        <Timer textSize={"xl"} />
        {/* <Text fz={24} c="dimmed">
          Set {"   "}
          {currentSet}/{totalSets}
        </Text> */}
        {/* <Group>
          <Group spacing={-2}>
            <ActionIcon
              size={34}
              variant="default"
              onClick={() => repHandler.current.decrement()}
            >
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={reps}
              onChange={(val) => setReps(val)}
              handlersRef={repHandler}
              max={999}
              min={0}
              step={1}
              styles={{ input: { width: rem(54), textAlign: "center" } }}
            />
            <ActionIcon
              size={34}
              variant="default"
              onClick={() => repHandler.current.increment()}
            >
              +
            </ActionIcon>
          </Group>

          <Group spacing={-2}>
            <ActionIcon
              size={34}
              variant="default"
              onClick={() => weightHandler.current.decrement()}
            >
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={weight}
              onChange={(val) => setWeight(val)}
              handlersRef={weightHandler}
              max={999}
              min={0}
              step={5}
              styles={{ input: { width: rem(54), textAlign: "center" } }}
            />
            <ActionIcon
              size={34}
              variant="default"
              onClick={() => weightHandler.current.increment()}
            >
              +
            </ActionIcon>
          </Group>
        </Group> */}
        <Button>Set Done</Button>
      </Stack>
    </Modal>
  );
}
