import { Modal } from "@mantine/core";
import { useState } from "react";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import SaveWorkoutBtn from "../buttons/SaveWorkoutBtn.jsx";
import auth from "../../utils/auth/auth";
import WorkoutState from "./WorkoutState";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";

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
            color: "grape",
          });
        }
      })
      .catch((err) => {});
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
      title={template.templateName.toUpperCase()}
      overlayOpacity={0.55}
      overlayBlur={3}
      transition={"rotate-left"}
      size="lg"
      className="text-2xl font-black"
    >
      <div className="mt-4 font-thin text-[17px] mr-5">
        {template.templateNotes.trim() ? "- " : null} {template.templateNotes}
      </div>
      <div className="p-5">
        <WorkoutState
          templateState={templateState}
          handleChange={handleChange}
          opened={opened}
        />
      </div>
      <div className="flex flex-col md:flex-nowrap justify-center gap-3 w-fit mx-auto">
        <SaveWorkoutBtn
          loading={loading}
          handleSaveWorkout={handleSaveWorkout}
          data={data}
          setOpened={setOpened}
        />
      </div>
      {error ? (
        <div className="text-error text-center mt-5">{error.message}</div>
      ) : null}
    </Modal>
  );
}
