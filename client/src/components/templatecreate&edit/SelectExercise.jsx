import { Modal, Select, Text } from "@mantine/core";
import { useRef } from "react";

export default function SelectExercise({
  formState,
  index,
  handleChange,
  open,
}) {
  const inputRef = useRef(null);

  // on focus of the exercise input open modal
  // but when the modal closes input is still focused, causing modal to open again
  /// so disable the input and re-enable it to fix
  function handleModal() {
    open();
    inputRef.current.disabled = true;
    inputRef.current.disabled = false;
  }

  return (
    <Modal title={<Text>Select Exercise</Text>}>
      <Select
        onChange={(value) =>
          handleChange(index, {
            target: { name: "exerciseName", value: value },
          })
        }
        searchable
        onFocus={handleModal}
        label="Exercise"
        value={formState.exercises[index].exerciseName}
        maxDropdownHeight={180}
      />
    </Modal>
  );
}
