import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";

export default function SaveWorkoutBtn({
  handleSaveWorkout,
  loading,
  data,
  setOpened,
}) {
  return (
    <Button
      onClick={() => {
        // async await was buggy
        // clicking the button would save the template but not close modal or show Notification
        handleSaveWorkout().then(() => {
          if (data?.saveWorkout.username) {
            setOpened(false);
            showNotification({
              title: `${data.saveWorkout.username} your template was saved!`,
              message: "Your template will be recorded. 🥳",
              autoClose: 3000,
              icon: <AiOutlineCheck />,
            });
          }
        });
      }}
      loading={loading}
      variant="outline"
    >
      Save Workout
    </Button>
  );
}
