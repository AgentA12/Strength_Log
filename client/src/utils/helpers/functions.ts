import { MantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { ExerciseShape, SetShape, TemplateShape } from "../../types/template";
import { Exercise } from "../../types/workoutState";

function getOneRepMax(weight: number, repetitions: number) {
  return weight < 1 || repetitions < 1 ? null : Math.round(((weight / (1.0278 - 0.0278 * repetitions)) * 10) / 10)
}

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


function compareDatesByDay(firstDate: Date, secondDate: Date) {
  return firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();
}


type Range = "Last 12 months" | "Last 6 months" | "Last 3 months" | "Last month" | "All time"

function getRangeOfDates(range: Range, firstDate: number, lastDate: number): Date[] {
  switch (range) {
    case "Last 12 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(12, "month").toString()),
        new Date(lastDate)
      );

    case "Last 6 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(6, "month").toString()),
        new Date(lastDate)
      );

    case "Last 3 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(3, "month").toString()),
        new Date(lastDate)
      );

    case "Last month":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(1, "month").toString()),
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

function getTotalVolumeForExercise(sets: { weight: number; reps: number }[]) {
  return sets.reduce((total, set) => (total += set.weight * set.reps), 0)
}

function getTotalReps(exercises: ExerciseShape[]) {

  return exercises.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.sets.reduce((total, set) => (total += set.reps), 0),
    0
  );

};

function getTotalSets(exercises: ExerciseShape[]) {
  return exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue.sets.length,
    0
  )
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  return Intl.NumberFormat("en-US").format(randomNumber);
}

function formatWorkoutState(template: TemplateShape) {
  return {
    exercises: template.exercises.map((exercise => {
      return {
        ...exercise,
        completed: false,
      };
    })), templateName: template.templateName, templateId: template._id
  };

}

function getPrimaryColor(theme: MantineTheme) {
  return theme.colors.primaryColor;
}

function compareExerciseSets(setsOne: SetShape[], setsTwo: SetShape[]) {
  type Results = {
    sets: SetShape[]
    increasedSets: SetShape[]
    decreasedSets: SetShape[]
  }

  let results: Results = { sets: [], increasedSets: [], decreasedSets: [] };

  if (setsOne.length > setsTwo.length) {
    setsOne.map((set: SetShape, i: number) => {
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

function compareWorkouts(selectedWorkout: any, previousWorkout: any) {

  interface Result {
    comparedWorkout: any
    selectedWorkout: any
    previousWorkout: any
  }


  let result: Result = { comparedWorkout: [], selectedWorkout, previousWorkout };

  selectedWorkout.exercises.map((exercise: Exercise) => {
    previousWorkout.exercises.map((exerciseTwo: Exercise) => {
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

function formatDate(date: number): string {
  if (isNaN(date)) {
    return "Invalid Date";
  }

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

// "chunk" is used to create a two dimensional array for pagination
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
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
  formatDate,
  chunk
};
