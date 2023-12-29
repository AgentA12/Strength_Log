import dayjs from "dayjs";

const getOneRepMax = (weight, repetitions) =>
  weight <= 0 || repetitions <= 0
    ? null
    : Math.round(((weight / [1.0278 - 0.0278 * repetitions]) * 10) / 10);

function getPercentageOf1RM(oneRepMax) {
  const repMax = parseFloat(oneRepMax);

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

  data.unshift({ weight: parseFloat(oneRepMax), percentage: 100, reps: 1 });

  return data;
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const compareDatesByDay = (firstDate, secondDate) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

function getRangeOfDates(range, firstDate, lastDate) {
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

// creates an array of dates one day apart from each other
function getDaysArray(firstDate, endDate) {
  for (
    var dateAry = [],
      currentDate = new Date(dayjs(firstDate).subtract(1, "day"));
    currentDate < new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    dateAry.push(new Date(currentDate));
  }
  return dateAry;
}

function displayExercisesForTemplate(templates, activeTemplate) {
  let temps = templates.filter(
    (template) =>
      template.templateName.toLowerCase() === activeTemplate.toLowerCase()
  )[0];

  return temps
    ? temps.exercises.map((exercise) => exercise.exercise.exerciseName + "   ")
    : templates.map((template) =>
        template.exercises.map(
          (exercise) => exercise.exercise.exerciseName + "   "
        )
      );
}

function formatTime(num) {
  if (num < 10) return `0${num}`;
  return `${num}`;
}

function findFirstAndLastRange(dataSet) {
  let greatestDate = new Date(0);

  for (let i = 0; i < dataSet.length; i++) {
    dataSet[i].data.map((d) =>
      new Date(d.x).getTime() > new Date(greatestDate).getTime()
        ? (greatestDate = d.x)
        : null
    );
  }

  let smallestDate = new Date(greatestDate);

  for (let x = 0; x < dataSet.length; x++) {
    dataSet[x].data.map((d) =>
      new Date(d.x).getTime() < new Date(smallestDate).getTime()
        ? (smallestDate = d.x)
        : null
    );
  }

  return [smallestDate, greatestDate];
}

function getTotalVolume(exercises) {
  let TotalVolume = 0;

  exercises.map((exercise) =>
    exercise.sets.map((set) => (TotalVolume += set.weight * set.reps))
  );

  return TotalVolume;
}

const getTotalVolumeForExercise = (exercise) => {
  console.log(exercise);
  return exercise.sets.reduce(
    (total, set) => (total += set.weight * set.reps),
    0
  );
};

const getTotalReps = (exercises) => {
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

export {
  getOneRepMax,
  capitalizeFirstLetter,
  compareDatesByDay,
  getDaysArray,
  getRangeOfDates,
  displayExercisesForTemplate,
  findFirstAndLastRange,
  getTotalVolume,
  formatTime,
  getTotalReps,
  getTotalSets,
  getPercentageOf1RM,
  getRandomInt,
  formatWorkoutState,
  getTotalVolumeForExercise,
};
