import ExerciseForm from "../exercises/ExerciseForm";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TEMPLATE } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import AddExerciseBtn from "../buttons/AddExerciseBtn";
import SaveTemplateBtn from "../buttons/SaveTemplateBtn";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditTemplate() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState(state.template);

  var {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  //ref on error message to scroll to bottom of exercise container when an exercise is added
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [formState.exercises.length]);

  const [EditTemplate] = useMutation(EDIT_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName" && target.name !== "templateNotes") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const mutationRes = await EditTemplate({
        variables: {
          ...formState,
          userId: userID,
        },
      });

      if (mutationRes) {
        refetch();
        navigate("/Templates");
      }
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      }
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
    <main className="ml-40">
      <div className="py-10  md:pl-10 border-b border-gray-600">
        <h1 className="font-bold text-3xl text-center md:text-left">
          <span className="mr-3">Edit</span>
          <span className="text-primary ml-1">
            {state.template.templateName}
          </span>
        </h1>
      </div>

      <div className="flex gap-6 mt-12 mb-10 mx-5">
        <div className="w-fit">
          <div className="mb-5">
            <input
              onChange={(event) => handleChange(null, event)}
              name="templateName"
              className="h-20 text-3xl bg-inherit  appearance-none border border-gray-600 rounded w-full py-2 px-4  leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in"
              type="text"
              value={formState?.templateName}
              placeholder="Template Name"
            />
          </div>

          <div className="block md:hidden flex-col  items-center">
            <textarea
              onChange={(event) => handleChange(null, event)}
              className="text-xl  appearance-none border border-gray-600 rounded w-full p-4  leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in resize-none"
              name="templateNotes"
              cols="30"
              rows="5"
              placeholder="Template notes"
              value={formState?.templateNotes}
            ></textarea>

            <div className="flex justify-between">
              <AddExerciseBtn addExercise={addExercise} />
              <SaveTemplateBtn loading={loading} handleSubmit={handleSubmit} />
            </div>

            <div className="text-center text-red-400 text-lg mt-5">
              {errorMessage ? errorMessage : null}
            </div>
          </div>

          <div className="exercise-container-scroll-h max-h-96 pr-2 pt-3 border-t border-gray-600">
            <form className="" onSubmit={(event) => handleSubmit(event)}>
              {formState?.exercises.map((exercise, index) => (
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

        <div className="hidden md:block flex-col w-96">
          <textarea
            onChange={(event) => handleChange(null, event)}
            className="text-xl  bg-inherit appearance-none border border-gray-600 rounded w-full p-4  leading-tight focus:ring-0 focus:outline-none focus:border-primary transition-colors ease-in resize-none"
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
            {errorMessage ? errorMessage : null}
          </div>
        </div>
      </div>
    </main>
  );
}
