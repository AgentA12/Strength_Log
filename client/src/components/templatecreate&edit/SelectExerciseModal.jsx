import { List, Modal, Select, Text, ThemeIcon } from "@mantine/core";
import { TbBarbell } from "react-icons/tb";

export default function SelectExerciseModal({
  opened,
  close,
  addExercise,
  exercises,
}) {
  return (
    <Modal title={<Text>Select Exercise</Text>} opened={opened} onClose={close}>
      <Select
        data={exercises}
        searchable
        onChange={(value) => addExercise(value)}
        placeholder="Select an exercise"
      />
      <List
        withPadding
        icon={
          <ThemeIcon size={24} radius="xl">
            <TbBarbell />
          </ThemeIcon>
        }
      >
        {exercises.map((e) => (
          <List.Item key={e.id}>{e.label}</List.Item>
        ))}
      </List>
    </Modal>
  );
}
