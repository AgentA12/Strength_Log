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
import { ScrollArea, TextInput, Textarea, Divider, Text } from "@mantine/core";

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

      if (!formState.templateName.trim()) {
        setErrorMessage("You must enter a template name");
        return;
      }

      for (let i = 0; i < formState.exercises.length; i++) {
        if (
          !formState.exercises[i].exerciseName ||
          !formState.exercises[i].sets ||
          !formState.exercises[i].reps
        ) {
          setErrorMessage("You must fill in all exercise fields");
          return;
        }
      }

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
      sets: 5,
      reps: 5,
      weight: 135,
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
    <main className="md:ml-40">
      <Divider
         my="sm"
         variant="dashed"
         label={
           <h1 className="font-bold text-4xl text-center md:text-left ml-5">
            Edit <Text color={'grape'} className="inline-block">{formState.templateName}</Text>
           </h1>
         }
      />

      <div className="flex gap-6 mt-12 mb-10 mx-5">
        <div className="w-fit">
          <div className="mb-5">
            <TextInput
              size="xl"
              onChange={(event) => handleChange(null, event)}
              name="templateName"
              value={formState?.templateName}
              placeholder="Template Name"
            />
          </div>

          <div className="block lg:hidden flex-col  items-center">
            <Textarea
              onChange={(event) => handleChange(null, event)}
              name="templateNotes"
              minRows={10}
              placeholder="Template notes"
              value={formState?.templateNotes}
            />

            <div className="flex justify-between mt-2">
              <AddExerciseBtn addExercise={addExercise} />
              <SaveTemplateBtn loading={loading} handleSubmit={handleSubmit} />
            </div>

            <div className="text-center text-red-400 text-lg mt-5">
              {errorMessage ? errorMessage : null}
            </div>
          </div>

          <ScrollArea
            ScrollArea
            style={{ height: 500 }}
            offsetScrollbars
            scrollbarSize={4}
            scrollHideDelay={1500}
            className="pr-2 pt-3 border-t border-gray-600"
          >
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
          </ScrollArea>
        </div>

        <div className="hidden lg:block flex-col w-96">
          <Textarea
            onChange={(event) => handleChange(null, event)}
            name="templateNotes"
            minRows={10}
            placeholder="Template notes"
            value={formState?.templateNotes}
          />

          <div className="flex justify-between mt-2">
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
