import { Spinner } from "flowbite-react";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
export default function SaveWorkoutBtn({ userID, template }) {
  const [saveWorkoutFunction, { data, loading, error }] =
    useMutation(SAVE_WORKOUT);

  if (data) console.log(data);

  if (error) return <div className="text-error">{error.message}</div>;

  return (
    <button
      onClick={() =>
        saveWorkoutFunction({
          variables: {
            templateId: template._id,
            userID: userID,
          },
        })
      }
      className="save-workout-btn w-full"
    >
      <span className="flex gap-5 w-full justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
        Save as complete
        {loading && <Spinner color="purple" aria-label="loading" />}
      </span>
    </button>
  );
}
