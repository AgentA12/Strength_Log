import { Fragment, useState } from "react";
import auth from "../../utils/auth/auth";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import SaveWorkoutBtn from "../buttons/SaveWorkoutBtn.jsx";

export default function WorkoutModal({
  template,
  isWorkoutModalOpen,
  setIsWorkoutModalOpen,
}) {
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
    } catch (error) {}
  }

  function handleChange({ target }, index) {
    let data = JSON.parse(JSON.stringify(templateState));

    data.exercises[index][target.name] = target.value;

    setTemplateState({ ...data });
  }

  return (
    <AnimatePresence>
      <div
        aria-hidden="true"
        className={`${isWorkoutModalOpen ? "modal-container" : "hidden"}`}
      >
        {isWorkoutModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="modal-body add-modal-height modal-scroll mx-2"
          >
            <div className="flex items-end justify-end">
              <span className="custom-ellipsis-title text-3xl font-bold mr-3">
                {template.templateName}
              </span>

              <button
                onClick={() => setIsWorkoutModalOpen(!isWorkoutModalOpen)}
                type="button"
                className=" self-start bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="mt-4">
              {template.templateNotes.trim() ? "- " : null}{" "}
              {template.templateNotes}
            </div>
            <div className="p-5">
              {templateState.exercises.map((exercise, index) => (
                <Fragment key={exercise.exerciseName}>
                  <p className="text-primary font-semibold text-3xl text-center mb-1">
                    {exercise.exerciseName}
                  </p>
                  <div className="flex justify-center items-center gap-2 mb-2 text-xl">
                    <span>
                      <input
                        type="text"
                        name="sets"
                        value={exercise.sets}
                        onChange={(event) => handleChange(event, index)}
                        className="rounded-lg   px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none"
                      />{" "}
                      x
                    </span>
                    <input
                      type="text"
                      name="reps"
                      value={exercise.reps}
                      onChange={(event) => handleChange(event, index)}
                      className="rounded-lg   px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none"
                    />
                    <span className="_faded">
                      {exercise.weight != "Body weight" ? (
                        <input
                          type="text"
                          name="weight"
                          value={exercise.weight}
                          onChange={(event) => handleChange(event, index)}
                          className="rounded-lg   px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none"
                        />
                      ) : null}
                    </span>
                    Ibs
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-3">
              {/* <StartWorkoutBtn template={template} /> */}
              <SaveWorkoutBtn
                loading={loading}
                handleSaveWorkout={handleSaveWorkout}
                data={data}
              />

              {error ? (
                <p className="text-error my-2 text-center">{error.message}</p>
              ) : null}
            </div>
            {error ? <div className="text-error">{error.message}</div> : null}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
