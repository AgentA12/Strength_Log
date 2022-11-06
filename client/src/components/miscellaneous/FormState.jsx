import { useState } from "react";

function FormState({ template }) {
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

  function handleChange(index, { target }) {
    let data = { ...formState };

    if (target.name !== "templateName") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  }

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
      return i != index;
    });

    data.exercises = filteredExercises;

    setFormState(data);
  }

  return <></>;
}

const formState = {
  handleChange: function (index, { target }, setFormState) {
    let data = { ...formState };

    if (target.name !== "templateName") {
      data.exercises[index][target.name] = target.value;

      setFormState({ ...data });
      return;
    }

    setFormState({ ...formState, [target.name]: target.value });
  },

  removeExercise: function (event, index, setFormState) {
    let data = { ...formState };

    const filteredExercises = formState.exercises.filter((_, i) => {
      return i != index;
    });

    data.exercises = filteredExercises;

    setFormState(data);
  },

  addExercise: function (setFormState) {
    const exercise = {
      exerciseName: "",
      sets: "",
      reps: "",
      weight: "",
    };

    const data = { ...formState };

    data.exercises.push(exercise);

    setFormState(data);
  },

  resetFormState: function (setFormState) {
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
  },
};
