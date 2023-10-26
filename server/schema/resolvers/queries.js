const { formatChartData } = require("../../utils/helpers");
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
            _id: p._id,
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
    return Exercise.find().select("-__v");
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

  getChartData: async function (
    _,
    { templateName, userId, shouldSortByTemplate, metric }
  ) {
    try {
      const { completedExercises } = await User.findById(userId)
        .populate({
          path: "completedExercises.exercise",
          model: "Exercise",
        })
        .populate({
          path: "completedExercises.belongsTo",
          model: "Template",
        })
        .sort({ createdAt: 1 })
        .select("completedExercises");

      let dataSet = formatChartData(completedExercises, metric);

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

  async getProgressByDate(_, { userID }) {
    try {
      const data = await User.findById(userID)
        .populate({
          path: "completedWorkouts.template",
          model: "Template",
        })
        .populate({
          path: "completedWorkouts.exercises.exercise",
          model: "Exercise",
        })
        .select("completedWorkouts");

      return data.completedWorkouts.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = Query;
