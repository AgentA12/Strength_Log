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

  getExercises: async function () {
    const exercises = await Exercise.find().select("-_id name");
    return exercises;
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
    { templateName, userId, range, metric }
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
            belongsTo: exercise.belongsTo.templateName,
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
      // let dataSets = [
      //   {
      //     belongsTo: "Upper body",
      //     label: "Bench press",
      //     data: [
      //       { x: "2023-07-05", y: 155 },
      //       { x: "2023-07-06", y: 155 },
      //       { x: "2023-07-10", y: 160 },
      //       { x: "2023-07-11", y: 160 },
      //       { x: "2023-07-15", y: 165 },
      //       { x: "2023-07-16", y: 165 },
      //       { x: "2023-07-20", y: 165 },
      //       { x: "2023-07-21", y: 165 },
      //       { x: "2023-07-25", y: 170 },
      //       { x: "2023-07-26", y: 170 },
      //       { x: "2023-07-30", y: 170 },
      //       { x: "2023-08-01", y: 170 },
      //     ],
      //   },

      //   {
      //     belongsTo: "Lower Body",
      //     label: "Hip thrust",
      //     data: [
      //       { x: "2023-06-29", y: 315 },
      //       { x: "2023-07-03", y: 320 },
      //       { x: "2023-07-04", y: 325 },
      //       { x: "2023-07-05", y: 335 },
      //       { x: "2023-07-06", y: 345 },
      //       { x: "2023-07-10", y: 375 },
      //       { x: "2023-07-11", y: 385 },
      //       { x: "2023-07-15", y: 385 },
      //       { x: "2023-07-16", y: 390 },
      //       { x: "2023-07-20", y: 405 },
      //       { x: "2023-07-21", y: 405 },
      //     ],
      //   },

      //   {
      //     belongsTo: "Lower Body",
      //     label: "Squats",
      //     data: [
      //       { x: "2023-06-29", y: 205 },
      //       { x: "2023-07-03", y: 225 },
      //       { x: "2023-07-04", y: 225 },
      //       { x: "2023-07-05", y: 225 },
      //       { x: "2023-07-06", y: 225 },
      //       { x: "2023-07-10", y: 230 },
      //       { x: "2023-07-11", y: 230 },
      //       { x: "2023-07-15", y: 230 },
      //       { x: "2023-07-16", y: 230 },
      //       { x: "2023-07-20", y: 220 },
      //       { x: "2023-07-21", y: 220 },
      //     ],
      //   },
      //   {
      //     belongsTo: "Lower Body",
      //     label: "Deadlift",
      //     data: [
      //       { x: "2023-06-05", y: 315 },
      //       { x: "2023-06-06", y: 315 },
      //       { x: "2023-06-10", y: 320 },
      //       { x: "2023-06-11", y: 320 },
      //       { x: "2023-06-15", y: 350 },
      //       { x: "2023-06-16", y: 350 },
      //       { x: "2023-06-20", y: 350 },
      //       { x: "2023-06-21", y: 350 },
      //     ],
      //   },

      //   {
      //     belongsTo: "Upper body",
      //     label: "Barbell row",
      //     data: [
      //       { x: "2023-05-20", y: 185 },
      //       { x: "2023-05-21", y: 185 },
      //       { x: "2023-05-22", y: 185 },
      //       { x: "2023-05-26", y: 195 },
      //       { x: "2023-05-27", y: 190 },
      //       { x: "2023-05-30", y: 190 },
      //       { x: "2023-05-31", y: 195 },
      //     ],
      //   },

      //   {
      //     belongsTo: "Upper body",
      //     label: "Dumbell incline press",
      //     data: [
      //       { x: "2023-06-20", y: 60 },
      //       { x: "2023-06-21", y: 60 },
      //       { x: "2023-06-22", y: 60 },
      //       { x: "2023-06-26", y: 60 },
      //       { x: "2023-06-27", y: 65 },
      //       { x: "2023-06-30", y: 65 },
      //       { x: "2023-06-31", y: 65 },
      //     ],
      //   },
      // ];

      if (templateName != "All templates")
        dataSet = dataSet.filter(
          (data) => data.belongsTo.toLowerCase() === templateName.toLowerCase()
        );

      return dataSet;
    } catch (error) {
      return error;
    }
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

  async getMostRecentlySavedTemplateData(_, { templateId, userId }) {
    const { progress } = await User.findById(userId);
    const mostRecent = progress
      .filter((progressObj) => progressObj.templateId.toString() === templateId)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0];
    // if mostRecent is null or undefined the user hasn't save a workout with that template
    // so query the users templates instead

    if (mostRecent != null && mostRecent != undefined) {
      return mostRecent;
    } else {
      const { templates } = await User.findById(userId).populate({
        path: "templates",
        populate: {
          path: "exercises",
          model: "Exercise",
        },
      });
      return templates
        .filter((template) => template._id.toString() === templateId)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0];
    }
  },

  async getExerciseProgress(_, { templateID, userID }) {
    const user = await User.findById(userID);
    const chartData = user.ExerciseProgress(templateID);

    return chartData;
  },
};

module.exports = Query;
