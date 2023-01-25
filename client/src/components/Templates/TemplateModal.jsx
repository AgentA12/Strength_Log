import { Modal } from "@mantine/core";
import { useState } from "react";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import SaveWorkoutBtn from "../buttons/SaveWorkoutBtn.jsx";
import auth from "../../utils/auth/auth";
import WorkoutState from "./WorkoutState";

export default function TemplateModal({ template, opened, setOpened }) {
  const [templateState, setTemplateState] = useState(template);

  const [saveWorkoutFunction, { data, loading, error }] =
    useMutation(SAVE_WORKOUT);

  const {
    data: { _id: userID },
  } = auth.getInfo();

  async function handleSaveWorkout() {
    try {
      await saveWorkoutFunction({
        variables: {
          templateId: template._id,
          userID: userID,
          exercises: templateState.exercises,
        },
      });
    } catch (error) {
      
    }
  }

  function handleChange({ target }, index) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[index][target.name] = target.value;

    setTemplateState({ ...data });
  }

  return (
    <Modal
    lockScroll={false}

      opened={opened}
      onClose={() => setOpened(false)}
      title={template.templateName}
      overlayOpacity={0.55}
      overlayBlur={3}
      transition={"rotate-left"}
    >
      <div className="mt-4">
        {template.templateNotes.trim() ? "- " : null} {template.templateNotes}
      </div>
      <div className="p-5">
        <WorkoutState
          templateState={templateState}
          handleChange={handleChange}
          opened={opened}
        />
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
        <SaveWorkoutBtn
          loading={loading}
          handleSaveWorkout={handleSaveWorkout}
          data={data}
          setOpened={setOpened}
        />

        {error ? (
          <p className="text-error my-2 text-center">{error.message}</p>
        ) : null}
      </div>
      {error ? <div className="text-error">{error.message}</div> : null}
    </Modal>
  );
}
