const { User, Exercise } = require("../../models/index");

const Query = {
  getProgressTimeStamps: async function (_, { userId }) {
    try {
      const { completedWorkouts } = await User.findById(userId).select(
        "-password"
      );
      if (completedWorkouts.length > 0) {
        const dates = completedWorkouts.map((p) => {
          return {
            date: p.createdAt,
            templateId: p._id,
          };
        });

        return { dates: dates };
      }

      return { dates: [] };
    } catch (error) {
      return error;
    }
  },

  getAllExercises: async function () {
    const exercises = await Exercise.find().select("-__v");

    return exercises;
  },

  getTemplates: async function (_, args) {
    try {
      const { templates } = await User.findById(args.userId).populate({
        path: "templates",
        populate: {
          path: "exercises.exercise",
          model: "Exercise",
        },
      });

      return templates.length > 0 ? templates : [];
    } catch (error) {
      return error;
    }
  },

  getChartDataForTemplates: async function (
    _,
    { templateName, userId, shouldSortByTemplate }
  ) {
    try {
      const user = await User.findById(userId)
        .populate({
          path: "completedExercises.exercise",
          model: "Exercise",
        })
        .populate({
          path: "completedExercises.belongsTo",
          model: "Template",
        })
        .select("-__v");

      function formatChartData(exerciseArrs) {
        let dataSet = exerciseArrs.map((exercise) => {
          return {
            label: exercise.exercise.exerciseName,
            belongsTo: exercise.belongsTo
              ? exercise.belongsTo.templateName
              : null,
            data: exercise.sets.map((set) => {
              return {
                x: new Date(exercise.savedOn).toLocaleDateString(),
                y: set.weight,
              };
            }),
          };
        });
        return dataSet;
      }

      let dataSet = formatChartData(user.completedExercises);

      if (templateName != "All templates" || !shouldSortByTemplate)
        dataSet = dataSet.filter((data) => {
          if (!data.belongsTo) return null;
          return data.belongsTo.toLowerCase() === templateName.toLowerCase();
        });

      let map = {};

      for (let i = 0; i < dataSet.length; i++) {
        if (!map[dataSet[i].label]) {
          map[dataSet[i].label] = dataSet[i].data;
        } else {
          map[dataSet[i].label] = map[dataSet[i].label].concat(dataSet[i].data);
        }
      }

      let newAry = [];

      for (const key in map) {
        newAry.push({
          label: key,
          data: map[key],
        });
      }

      return newAry;
    } catch (error) {
      return error;
    }
  },

  getChartDataForExercises: async function (_, args) {
    return;
  },

  async getProgressByDate(_, { userID }) {
    try {
      const { completedWorkouts } = await User.findById(userID)
        .populate({
          path: "completedWorkouts.template",
          model: "Template",
        })
        .populate({
          path: "completedWorkouts.exercises.exercise",
          model: "Exercise",
        })
        .select("-password");

      return completedWorkouts;
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = Query;
