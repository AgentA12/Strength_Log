import ExerciseForm from "./ExerciseForm";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import AddExerciseBtn from "../buttons/AddExerciseBtn";
import SaveTemplateBtn from "../buttons/SaveTemplateBtn";
import LoadingScreen from "../LoadingScreen";

export default function CreateTemplateContainer() {
  //getting user info
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  //ref on error message to scroll to bottom of div when exercise is added
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  const [formState, setFormState] = useState({
    templateName: "",
    templateNotes: "",
    exercises: [
      {
        exerciseName: "",
        sets: "",
        reps: "",
        weight: "",
        type: "",
      },
    ],
  });

  const [addTemplate] = useMutation(CREATE_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName" && target.name !== "templateNotes") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  //call this to reset the addTemplateForm
  function resetFormState() {
    setFormState({
      templateName: "",
      exercises: [
        {
          exerciseName: "",
          sets: "",
          reps: "",
          weight: "",
          templateNotes: "",
        },
      ],
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      console.log(formState);

      const mutationRes = await addTemplate({
        variables: {
          ...formState,
          userId: userID,
        },
      });

      if (mutationRes) {
        //if template is added, close modal, reset form and refetch new templates
        resetFormState();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //adds an exercise to the form
  function addExercise() {
    const exercise = {
      exerciseName: "",
      sets: "",
      reps: "",
      weight: "",
      type: "",
    };

    const data = { ...formState };

    data.exercises.push(exercise);

    setFormState(data);
  }

  function removeExercise(event, index) {
    let data = { ...formState };

    const filteredExercises = formState.exercises.filter((_, i) => {
      return i !== index;
    });

    data.exercises = filteredExercises;

    setFormState(data);
  }

  return (
    <>
      {loading ? <LoadingScreen /> : null}
      <div className="py-10 xl:pl-72 pl-10 border-b border-gray-600">
        <h1 className="font-medium text-3xl">Create A Template</h1>
      </div>

      <div className="flex gap-6 mt-12 mb-10 mr-5">
        <div className="xl:pl-72 pl-10 w-fit">
          <div className="mb-5">
            <input
              onChange={(event) => handleChange(null, event)}
              name="templateName"
              className="h-20 text-3xl bg-background appearance-none border border-gray-600 rounded w-full py-2 px-4 text-white leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in"
              type="text"
              value={formState.templateName}
              placeholder="Template Name"
            />
          </div>

          <div className="h-custom-2 modal-scroll overflow-scroll pr-2 ">
            <form className="" onSubmit={(event) => handleSubmit(event)}>
              {formState.exercises.map((exercise, index) => (
                <ExerciseForm
                  key={index}
                  handleChange={handleChange}
                  index={index}
                  formState={formState}
                  removeExercise={removeExercise}
                />
              ))}

              <div ref={bottomRef}></div>
            </form>
          </div>
        </div>

        <div className="flex-col w-96">
          <textarea
            onChange={(event) => handleChange(null, event)}
            className="text-xl bg-background appearance-none border border-gray-600 rounded w-full p-4 text-white leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in resize-none"
            name="templateNotes"
            cols="30"
            rows="10"
            placeholder="Template notes"
            value={formState.templateNotes}
          ></textarea>

          <div className="flex justify-between">
            <AddExerciseBtn addExercise={addExercise} />
            <SaveTemplateBtn loading={loading} handleSubmit={handleSubmit} />
          </div>

          <div className="text-center text-red-400 text-lg mt-5">
            {error ? error.message : null}
          </div>
        </div>
      </div>
    </>
  );
}
