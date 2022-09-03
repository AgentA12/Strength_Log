import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ADD_EXERCISE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

const buttonStyle = { color: "#BB86FC" };

export const TemplateContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addExercise, { data, loading, error }] = useMutation(ADD_EXERCISE);

  const [formState, setFormState] = useState({
    name: "",
    sets: null,
    reps: null,
  });

  function handleChange({ target }) {
    setFormState({ ...formState, [target.name]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addExercise({
      variables: {
        ...formState,
      },
    });
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="template-container">
        <div className="flex gap-5">
          <h3 className="text-primary font-extrabold text-3xl">
            Your Templates
          </h3>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            type="button"
            className="flex items-center gap-1 text-primary bg-primary_faded bg-opacity-40  focus:outline-none focus:ring-0 font-medium rounded-full px-3 py-1 text-center"
          >
            <AiOutlinePlus style={buttonStyle} size={24} /> Template
          </button>
        </div>

        <div className="template-item mt-10 p-3 border rounded-lg border-primary hover:bg-primary hover:bg-opacity-25 cursor-pointer">
          <p className="template-title font-bold">Upper Body</p>
        </div>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            : "hidden"
        }  `}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto bg-overlay text-white">
          <div className="relative  rounded-lg shadow ">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold  dark:text-white">
                Template Name
              </h3>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <p>
              Add Exercise <AiOutlinePlus />
            </p>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="p-6 space-y-6 bg-overlay">
                <label htmlFor="reps">Name: </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="bg-overlay mr-3"
                />

                <label htmlFor="reps">Reps: </label>
                <input
                  onChange={handleChange}
                  name="reps"
                  type="number"
                  placeholder="Reps"
                  className="bg-overlay mr-3"
                />
                <label htmlFor="reps">Sets: </label>
                <input
                  onChange={handleChange}
                  name="sets"
                  type="number"
                  placeholder="Sets"
                  className="bg-overlay"
                />
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="submit"
                  className="flex items-center gap-2 text-overlay bg-primary_faded hover:bg-opacity-75 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Template
                  {/* <div role="status">
                    <svg
                      class="inline mr-2 w-8 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div> */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
