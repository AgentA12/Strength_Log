import { useState } from "react";
import TemplateCard from "./TemplateCard";
import { HiPlus } from "react-icons/hi";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import auth from "../../utils/auth/auth";
import { useEffect } from "react";
import ExerciseForm from "./ExerciseForm";

const buttonStyle = { color: "#BB86FC" };

export function TemplateContainer() {
  const [templates, setTemplates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    templateName: "",
    exercises: [
      {
        exerciseName: "",
        sets: null,
        reps: null,
        weight: null,
      },
    ],
  });

  //getting users information
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  //function for getting templates
  const [getTemplates, { called, loading, data }] = useLazyQuery(
    GET_TEMPLATES,
    {
      variables: {
        userId: userID,
      },
    }
  );

  //get the templates when the component renders
  useEffect(() => {
    getTemplates();
  }, []);

  //function for adding a template
  const [addTemplate, {}] = useMutation(CREATE_TEMPLATE);

  //updates the form state
  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name != "templateName") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value.trim() });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const mutationRes = await addTemplate({
      variables: {
        ...formState,
        userId: userID,
      },
    });
    if (mutationRes) {
      setIsModalOpen(!isModalOpen);
      resetFormState();
    }
  }

  //adds an exercise to the form
  function addExercise() {
    const exercise = {
      exerciseName: "",
      sets: null,
      reps: null,
      weight: null,
    };

    const data = { ...formState };

    data.exercises.push(exercise);

    setFormState(data);
  }

  //call this to reset the form modal
  function resetFormState() {
    setFormState({
      templateName: "",
      exercises: [
        {
          exerciseName: "",
          sets: null,
          reps: null,
          weight: null,
        },
      ],
    });
  }

  return (
    <div className="ml-5 mr-40 md:ml-52 my-20">
      <div className="flex gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Your Templates</h3>
        {auth.isLoggedIn() && (
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            type="button"
            className="flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40 focus:outline-none focus:ring-0 font-medium rounded-full px-3 text-center"
          >
            <HiPlus style={buttonStyle} size={24} /> Template
          </button>
        )}
      </div>

      {auth.isLoggedIn() ? (
        data?.getTemplatesForUser.templates.length ? (
          <div className="flex flex-wrap gap-5 mt-10">
            {data?.getTemplatesForUser.templates.map((template, i) => (
              <TemplateCard template={template} key={i} />
            ))}
          </div>
        ) : (
          <p className="text-xl font-extralight mt-3">You have no templates</p>
        )
      ) : (
        <div className="flex gap-4 items-center mt-3">
          <p className=" text-xl font-extralight">
            Log in to see your templates
          </p>
          <Link to={"/Login"}>
            <button
              type="button"
              className="w-fit text-primary hover:text-background border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary_faded font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log in
            </button>
          </Link>
        </div>
      )}

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen
            ? "flex items-center justify-center bg-background bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            : "hidden"
        }  `}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto  bg-overlay text-white rounded-md">
          <div className="flex">
            <div className="w-full mb-5">
              <input
                onChange={(event) => handleChange(null, event)}
                name="templateName"
                className="text-4xl bg-overlay border-none appearance-none block w-full mb-3 leading-tight focus:outline-none focus:ring-0"
                type="text"
                placeholder="Template Name"
                value={formState.templateName}
              />
            </div>

            <button
              onClick={() => [setIsModalOpen(!isModalOpen), resetFormState()]}
              type="button"
              className="self-start bg-transparent hover:text-gray-500 rounded-lg text-sm px-3 py-1.5 ml-auto inline-flex justify-end bg-overlay_two"
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

          <form className="w-full" onSubmit={(event) => handleSubmit(event)}>
            {formState.exercises.map((input, index) => (
              <ExerciseForm
                key={index}
                handleChange={handleChange}
                index={index}
                formState={formState}
              />
            ))}

            <button
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
