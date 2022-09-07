import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import { AiOutlinePlus } from "react-icons/ai";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../../utils/auth/auth";
import { useEffect } from "react";
import ExerciseForm from "./ExerciseForm";

const buttonStyle = { color: "#BB86FC" };

// const templates = [
//   {
//     templateName: "Lowerbody",
//     exercises: [
//       {
//         exerciseName: "squats",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "hipthrust",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "romanian deadlifts",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//     ],
//   },
//   {
//     templateName: "Upperbody",
//     exercises: [
//       {
//         exerciseName: "benchpress",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "Pull ups",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "overhead press",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//     ],
//   },
//   {
//     templateName: "Fullbody",
//     exercises: [
//       {
//         exerciseName: "deadlifts",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "bench press",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "squats",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "bicep curls",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//       {
//         exerciseName: "tricep extentions",
//         weight: 225,
//         reps: 8,
//         sets: 4,
//       },
//     ],
//   },
// ];

export function TemplateContainer() {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userTemplates, setUserTemplates] = useState([]);
  const [formState, setFormState] = useState({
    templateName: "",
    exerciseName: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setUserData(auth.getInfo());
    }
  }, []);

  const { data, error } = useQuery(GET_TEMPLATES, {
    variables: {
      _id: userData?.userId,
    },
  });

  const [addTemplate, {}] = useMutation(CREATE_TEMPLATE);

  function handleChange({ target }) {
    if (isNaN(target.value)) {
      setFormState({ ...formState, [target.name]: target.value.trim() });
      return;
    }
    setFormState({ ...formState, [target.name]: parseInt(target.value) });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await addTemplate({
      variables: {
        ...formState,
        userId: userData.userId,
      },
    });
  }

  console.log(auth.isLoggedIn())

  return (
    <div className="flex justify-center mt-20">
      <div className="template-container">
        <div className="flex gap-5">
          <h3 className="text-primary font-extrabold text-3xl">
            Your Templates
          </h3>
          {auth.isLoggedIn() && (
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              type="button"
              className="flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40  focus:outline-none focus:ring-0 font-medium rounded-full px-3 py-1 text-center"
            >
              <AiOutlinePlus style={buttonStyle} size={24} /> Template
            </button>
          )}
        </div>

        {/* check if user is logged in or has templates */}
        {!auth.isLoggedIn() ? (
          <p className="mt-3 text-xl font-extralight">
            You must log in to see your templates
          </p>
        ) : userData?.length ? (
          userData.getTemplates.map((template) => {
            <div className="template-item mt-10 p-3 border rounded-lg border-primary hover:bg-primary hover:bg-opacity-25 cursor-pointer">
              <p className="template-title font-bold">{template.name}</p>
            </div>;
          })
        ) : (
          <p className="text-xl font-extralight">You have no templates</p>
        )}
      </div>

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
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto my-10 bg-overlay text-white rounded-md">
          <div className="text-right">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              type="button"
              className="text-gray-400 bg-transparent hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex justify-end"
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

          <div className="w-full px-3 border-b border-primary_faded mb-5">
            <label
              className="block uppercase tracking-wide text-grey-400 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Template Name
            </label>
            <input
              onChange={handleChange}
              name="templateName"
              className=" bg-overlay appearance-none block w-full text-grey-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:ring-0 focus:border-primary "
              type="text"
            />
          </div>

          <form className="w-full" onSubmit={(event) => handleSubmit(event)}>
            {[...Array(exerciseCount)].map((_, i) => (
              <ExerciseForm key={i} handleChange={handleChange} />
            ))}

            <button
              onClick={() => setExerciseCount(exerciseCount + 1)}
              type="button"
              className="w-full font-medium rounded-lg text-sm px-5 py-2.5 justify-center my-8 flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40  focus:outline-none focus:ring-0  text-center"
            >
              Add Exercise
            </button>

            <button
              onClick={handleSubmit}
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
