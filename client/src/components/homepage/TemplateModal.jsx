import { Container, Modal, Text, Title } from "@mantine/core";
import { useState } from "react";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import SaveWorkoutBtn from "./SaveWorkoutBtn.jsx";
import auth from "../../utils/auth/auth";
import WorkoutState from "./WorkoutState";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";

export default function TemplateModal({ template, opened, setOpened }) {
  const [templateState, setTemplateState] = useState(template);

  const [saveWorkoutFunction, { data, loading, error }] =
    useMutation(SAVE_WORKOUT);

  const {
    data: { _id: userID },
  } = auth.getInfo();

  function handleSaveWorkout() {
    // async await is very inconsistent here
    saveWorkoutFunction({
      variables: {
        templateId: template._id,
        userID: userID,
        exercises: templateState.exercises,
      },
    })
      .then((res) => {
        if (res.data?.saveWorkout.username && !loading) {
          setOpened(false);
          showNotification({
            title: `${res.data.saveWorkout.username} your template was saved!`,
            message: "Your workout will be recorded. 🥳",
            autoClose: 3000,
            icon: <AiOutlineCheck />,
          });
        }
      })
      .catch((error) => {
        showNotification({
          title: `Oops, there was an error while saving your template`,
          message: error.message,
          autoClose: 3000,
          icon: <BiErrorCircle />,
          color: "red",
        });
      });
  }

  function handleChange({ target }, index) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[index][target.name] = parseInt(target.value);

    setTemplateState({ ...data });
  }

  return (
    <Modal
      lockScroll={false}
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={2}>{template?.templateName.toUpperCase()}</Title>}
      overlayopacity={0.55}
      overlayblur={3}
      transition={"rotate-left"}
      size="lg"
    >
      <Container>
        <Text mb={10}>
          {template?.templateNotes.trim() ? "- " : null}{" "}
          {template?.templateNotes}
        </Text>
        <WorkoutState
          templateState={templateState}
          handleChange={handleChange}
          opened={opened}
        />
        <SaveWorkoutBtn
          loading={loading}
          handleSaveWorkout={handleSaveWorkout}
          data={data}
          setOpened={setOpened}
        />
        {error ? <Text color="red" mt={5}>{error.message}</Text> : null}
      </Container>
    </Modal>
  );
}
