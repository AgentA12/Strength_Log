import {
  useMantineTheme,
  Stack,
  Modal,
  Title,
  ActionIcon,
  Menu,
  Button,
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

        <Button>Set Done</Button>
      </Stack>
    </Modal>
  );
}
