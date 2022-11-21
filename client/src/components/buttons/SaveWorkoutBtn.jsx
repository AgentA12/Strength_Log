import Spinner from "../miscellaneous/Spinner";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function SaveWorkoutBtn({ userID, template }) {
  const [errorMessage, setErrorMessage] = useState();
  const [buttonText, setButtonText] = useState("Save as complete");
  const [saveWorkoutFunction, { loading, error }] = useMutation(SAVE_WORKOUT);

  if (error) return <div className="text-error">{errorMessage}</div>;

  async function handleSave() {
    try {
      const { data } = await saveWorkoutFunction({
        variables: {
          templateId: template._id,
          userID: userID,
        },
      });

      if (data.saveWorkout) {
        setButtonText("Saved!");
        setTimeout(() => {
          setButtonText("Save as complete");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }
}

export default function SaveWorkoutBtn({ loading, handleSaveWorkout }) {
  return (
    <button onClick={handleSave} className="save-workout-btn w-full">
      <span className={`${buttonText === "Saved!" ? "cursor-not-allowed bg-opacity-0 group-hover:bg-none" : "group-hover:bg-opacity-0" } flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md `}>
        {buttonText}
        {loading ? <Spinner color={"green-500"} className="pl-4" /> : null}
      </span>
    </button>
  );
}

