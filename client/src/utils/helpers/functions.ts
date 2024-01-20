import { MantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { ExerciseShape } from "../../types/template";

const getOneRepMax = (weight: number, repetitions: number) =>
  weight < 1 || repetitions < 1 ? null : Math.round(((weight / (1.0278 - 0.0278 * repetitions)) * 10) / 10);

function getPercentageOf1RM(oneRepMax: number) {
  const repMax = oneRepMax;

  let reps = 30;
  let data = [];
  let percentage = 50;

  while (reps >= 2) {
    data.unshift({
      percentage: percentage,
      reps: reps,
      weight: parseFloat(((percentage / 100) * repMax).toFixed(1)),
    });
    if (reps === 30) {
      reps = reps - 6;
    } else if (reps >= 16) {
      reps = reps - 4;
    } else {
      reps = reps - 2;
    }
    percentage = percentage + 5;
  }

  data.unshift({ weight: oneRepMax, percentage: 100, reps: 1 });

  return data;
}


// checks if two dates are on the same day
const compareDatesByDay = (firstDate: Date, secondDate: Date) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

function getRangeOfDates(range: string, firstDate: number, lastDate: number) {
  switch (range) {
    case "Last 12 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(12, "month").$d),
        new Date(lastDate)
      );

    case "Last 6 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(6, "month").$d),
        new Date(lastDate)
      );

    case "Last 3 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(3, "month").$d),
        new Date(lastDate)
      );

    case "Last month":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(1, "month").$d),
        new Date(lastDate)
      );

    default:
      return getDaysArray(new Date(firstDate), new Date(lastDate));
  }
}

function getDaysArray(firstDate: Date, endDate: Date) {
  for (
    var dateAry = [],
    currentDate = new Date(dayjs(firstDate).subtract(1, "day").toString());
    currentDate < new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    dateAry.push(new Date(currentDate));
  }
  return dateAry;
}


function formatTime(num: number) {
  if (num < 10) return `0${num}`;
  return `${num}`;
}

// finds the most recent and oldest date
function findFirstAndLastRange(dataSet: { x: string; y: number }[]) {
  let mostRecentDate = 0;
  let oldestDate = Infinity;

  for (const { x } of dataSet) {
    const currentDate = parseInt(x);

    if (isNaN(currentDate)) {
      continue;
    }

    mostRecentDate = Math.max(mostRecentDate, currentDate);
    oldestDate = Math.min(oldestDate, currentDate);
  }

  return [oldestDate, mostRecentDate];
}

function getTotalVolume(exercises: ExerciseShape[]) {
  let TotalVolume = 0;

  exercises.map((exercise: ExerciseShape) =>
    exercise.sets.map((set) => (TotalVolume += set.weight * set.reps))
  );

  return TotalVolume;
}

const getTotalVolumeForExercise = (sets: { weight: number; reps: number }[]) =>
  sets.reduce((total, set) => (total += set.weight * set.reps), 0);

const getTotalReps = (exercises: ExerciseShape[]) => {
  if (exercises?.length != undefined) {
    return exercises.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.sets.reduce((total, set) => (total += set.reps), 0),
      0
    );
  } else {
    return exercises.sets.reduce((total, set) => (total += set.reps), 0);
  }
};

const getTotalSets = (exercises) =>
  exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue.sets.length,
    0
  );

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  return Intl.NumberFormat("en-US").format(randomNumber);
}

function formatWorkoutState(template) {
  let workoutState = template.exercises.map((exercise) => {
    return {
      ...exercise,
      completed: false,
    };
  });

  workoutState.templateName = template.templateName;
  workoutState.templateId = template._id;

  return workoutState;
}

function getPrimaryColor(theme: MantineTheme) {
  return theme.colors.primaryColor;
}

function compareExerciseSets(setsOne, setsTwo) {
  let results = { sets: [], increasedSets: [], decreasedSets: [] };

  if (setsOne.length > setsTwo.length) {
    setsOne.map((set, i) => {
      if (setsTwo[i] != undefined) {
        results.sets.push({
          ...set,
          weightChange: set.weight - setsTwo[i].weight,
          repChange: set.reps - setsTwo[i].reps,
        });
      } else {
        results.increasedSets.push({ ...set });
      }
    });
  } else if (setsOne.length < setsTwo.length) {
    setsTwo.map((set, i) => {
      if (setsOne[i] != undefined) {
        results.sets.push({
          ...setsOne[i],
          weightChange: setsOne[i].weight - set.weight,
          repChange: setsOne[i].reps - set.reps,
        });
      } else {
        results.decreasedSets.push({ ...set });
      }
    });
  } else {
    setsOne.map((set, i) => {
      results.sets.push({
        ...set,
        weightChange: set.weight - setsTwo[i].weight,
        repChange: set.reps - setsTwo[i].reps,
      });
    });
  }
  return { ...results };
}

function compareWorkouts(selectedWorkout, previousWorkout) {
  let result = { comparedWorkout: [], selectedWorkout, previousWorkout };
  selectedWorkout.exercises.map((exercise) => {
    previousWorkout.exercises.map((exerciseTwo) => {
      if (exercise.exercise._id === exerciseTwo.exercise._id) {
        result.comparedWorkout.push({
          exerciseName: exercise.exercise.exerciseName,
          ...compareExerciseSets(exercise.sets, exerciseTwo.sets),
        });
      }
    });
  });

  return result;
}

export {
  getOneRepMax,
  compareDatesByDay,
  getDaysArray,
  getRangeOfDates,
  findFirstAndLastRange,
  getTotalVolume,
  formatTime,
  getTotalReps,
  getTotalSets,
  getPercentageOf1RM,
  getRandomInt,
  formatWorkoutState,
  getTotalVolumeForExercise,
  getPrimaryColor,
  compareExerciseSets,
  compareWorkouts,
};
