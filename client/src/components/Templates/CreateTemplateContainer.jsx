import { Input } from "@material-tailwind/react";
import ExerciseForm from "./ExerciseForm";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import { Spinner } from "flowbite-react";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";

export default function CreateTemplateContainer() {
  const inputRef = useRef(null);

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

  //this ref is on the add exercise btn so the modal with scroll to the newly added exercise
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  const [formState, setFormState] = useState({
    templateName: "",
    exercises: [
      {
        exerciseName: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ],
  });

  const [addTemplate] = useMutation(CREATE_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName") {
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
        },
      ],
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

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
      <div className="py-10 pl-72 border-b border-gray-600">
        <h1 className="font-medium text-3xl">Create A Template</h1>
      </div>

      <div className="pl-72 mt-12 w-fit mb-10">
        <div className="my-5">
          <input
            onChange={(event) => handleChange(null, event)}
            name="templateName"
            className="h-20 text-3xl bg-background appearance-none border border-gray-600 rounded w-full py-2 px-4 text-white leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in"
            type="text"
            value={formState.templateName}
            placeholder="Template Name"
          />
        </div>

        <div className="">
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

            <div className="text-center text-red-400">
              {error && error.message}
            </div>

            <button
              ref={bottomRef}
              onClick={addExercise}
              type="button"
              className="w-full font-medium rounded-lg text-sm px-5 py-2.5 justify-center my-8 flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40  focus:outline-none focus:ring-0  text-center"
            >
              Add Exercise
            </button>

            <button
              type="submit"
              className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center"
            >
              Save Template
              {loading && (
                <Spinner
                  color="purple"
                  size={"sm"}
                  aria-label="Purple spinner"
                  style={{ marginLeft: 10 }}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
