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

export default function WorkoutModal({
  opened,
  close,
  exercise,
  templateName,
  index,
}) {
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
      <Stack align="center" spacing={5} justify="center">
        <Title
          tt="capitalize"
          order={2}
          sx={(theme) => ({ color: theme.colors.brand[4] })}
          mt={5}
        >
          {exercise.exercise.exerciseName}
        </Title>
        <Text c="dimmed">{`Set ${1} / ${5}`}</Text>

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
        <Button mt="md">Set Done</Button>

        <RingProgress
          size={200}
          label={
            <Stack align="center">
              <Text size="sm" ta="center">
                Rest Time
              </Text>
              <CountDown />
            </Stack>
          }
          thickness={4}
          sections={[{ value: 20, color: "brand" }]}
        />
        <Button>Skip</Button>
        <Button>Continue</Button>

        <Stack align="center">
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
        </Stack>
      </Stack>
    </Modal>
  );
}
