import ExerciseForm from "./ExerciseForm";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEMPLATE } from "../../utils/graphql/mutations";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import AddExerciseBtn from "./AddExerciseBtn";
import SaveTemplateBtn from "./SaveTemplateBtn";
import { useNavigate } from "react-router-dom";
import { ScrollArea, TextInput, Textarea, Divider } from "@mantine/core";

export default function CreateTemplateContainer() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState({
    templateName: "",
    templateNotes: "",
    exercises: [
      {
        exerciseName: "",
        sets: 5,
        reps: 5,
        weight: 135,
        type: "Barbell",
      },
    ],
  });

  //getting user info
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const { loading, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  //ref on error message to scroll to bottom of exercise container div when exercise is added
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  const [addTemplate, { loading: createTemplateLoading }] =
    useMutation(CREATE_TEMPLATE);

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName" && target.name !== "templateNotes") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

  function resetFormState() {
    setFormState({
      templateName: "",
      templateNotes: "",
      exercises: [
        {
          exerciseName: "",
          sets: 5,
          reps: 5,
          weight: 135,
          type: "Barbell",
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
        //if template is added, reset form and refetch new templates and remove the error message
        resetFormState();
        refetch();
        setErrorMessage(null);
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
      sets: 5,
      reps: 5,
      weight: 135,
      type: "Barbell",
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
    <main className="md:ml-12">
      <Divider
        my="sm"
        className="m-0"

        variant="dashed"
        label={
          <h1 className="font-bold text-3xl text-center md:text-left ml-5">
            Create A Template
          </h1>
        }
      />

      <div className="flex gap-6  mb-10 mx-5">
        <div className="w-fit">
          <div className="mb-5">
            <TextInput
              onChange={(event) => handleChange(null, event)}
              name="templateName"
              value={formState?.templateName}
              placeholder="Template Name"
              size="xl"
            />
          </div>

          <div className="block lg:hidden flex-col  items-center">
            <Textarea
              minRows={10}
              onChange={(event) => handleChange(null, event)}
              color={"grape"}
              name="templateNotes"
              placeholder="Template notes"
              value={formState?.templateNotes}
            ></Textarea>

            <div className="flex justify-between mt-2">
              <AddExerciseBtn addExercise={addExercise} />
              <SaveTemplateBtn loading={loading} handleSubmit={handleSubmit} />
            </div>

            <div className="text-center text-red-400 text-lg mt-5">
              {errorMessage ? errorMessage : null}
            </div>
          </div>

          <ScrollArea
            style={{ height: 500 }}
            offsetScrollbars
            scrollbarSize={4}
            scrollHideDelay={1500}
          >
            <form onSubmit={(event) => handleSubmit(event)}>
              {formState?.exercises.map((_, index) => (
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
          </ScrollArea>
        </div>

        <div className="hidden lg:block flex-col w-96">
          <Textarea
            minRows={10}
            onChange={(event) => handleChange(null, event)}
            color={"grape"}
            name="templateNotes"
            placeholder="Template notes"
            value={formState?.templateNotes}
          ></Textarea>

          <div className="flex justify-between mt-2">
            <AddExerciseBtn addExercise={addExercise} />
            <SaveTemplateBtn
              loading={createTemplateLoading}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="text-center text-red-400 text-lg mt-5">
            {errorMessage ? errorMessage : null}
          </div>
        </div>
      </div>
    </main>
  );
}
