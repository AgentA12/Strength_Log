
const getOneRepMax = (weight, repetitions) =>
  Math.round(Math.round((weight / [1.0278 - 0.0278 * repetitions]) * 10) / 10);

function formatChartData(exerciseArrs, metric) {
  let dataSet = exerciseArrs.map((exercise) => {
    return {
      label: exercise.exercise.exerciseName,
      belongsTo: exercise.belongsTo ? exercise.belongsTo.templateName : null,
      data: exercise.sets.map((set) => {
        return {
          x: new Date(exercise.savedOn).toLocaleDateString(),
          y:
            metric === "Total Volume"
              ? set.weight * set.reps * exercise.sets.length - 1
              : calculateEstOneRepMax(exercise),
        };
      }),
    };
  });
  return dataSet;
}

const calculateEstOneRepMax = (exercise) => {
  return Math.max(
    ...exercise.sets.map((set) => getOneRepMax(set.weight, set.reps))
  );
};

module.exports = {
  getOneRepMax,
  calculateEstOneRepMax,
  formatChartData,
};
