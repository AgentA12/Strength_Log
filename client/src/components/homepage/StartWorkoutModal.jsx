import classes from "./startworkoutmodal.module.css";
import { Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { formatWorkoutState } from "../../utils/helpers/functions";

export default function StartWorkoutModal({ opened, close, templates }) {
  const navigate = useNavigate();

  function startWorkout(template) {
    const workoutState = formatWorkoutState(template);

    navigate("/Workout", { state: { template: workoutState } });
  }
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text size="xl" tt="capitalize" fw={700}>
          Select a template
        </Text>
      }
    >
      {templates.map((template) => (
        <Text
          tt="capitalize"
          className={classes.list}
          onClick={() => startWorkout(template)}
          p={5}
          key={template._id}
        >
          {template.templateName}
        </Text>
      ))}
    </Modal>
  );
}
