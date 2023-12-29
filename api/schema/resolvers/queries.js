import { formatChartData } from "../../utils/helpers.js";
import { User, Exercise } from "../../models/index.js";

const Query = {
  calendarTimeStamps: async function (_, { userId }) {
    try {
      const { completedWorkouts: dates } = await User.findById(userId).select(
        "completedWorkouts._id completedWorkouts.createdAt"
      );

      return dates.length ? dates : [];
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

  getTemplateProgress: async function (_, { userID, templateID }) {
    try {
      const { completedWorkouts } = await User.findById(userID)
        .select("completedWorkouts")
        .populate({
          path: "completedWorkouts.template",
          model: "Template",
          populate: {
            path: "exercises.exercise",
            model: "Exercise",
          },
        });

      const workouts = completedWorkouts
        .filter((workout) => workout?.template?._id.toString() === templateID)
        .sort((a, b) => b.createdAt - a.createdAt);

      return workouts;
    } catch (error) {
      return error.message;
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

  async getProgressByDate(_, { userID, workoutID }) {
    try {
      if (workoutID) {
        // query the user by userID
        // on that returned query select only the completedWorkouts

        const { completedWorkouts } = await User.findById(
          userID,
          "completedWorkouts"
        )
          .populate({
            path: "completedWorkouts.template",
            model: "Template",
          })
          .populate({
            path: "completedWorkouts.exercises.exercise",
            model: "Exercise",
          });

        const completedWorkout = completedWorkouts.find(
          (workout) => workout._id.toString() === workoutID
        );

        const templateID = completedWorkout.template._id.toString();

        const sameTemplates = completedWorkouts
          .filter(
            (workout) =>
              workout?.template?._id?.toString() === templateID.toString()
          )
          .sort((a, b) => b.createdAt - a.createdAt);

        const summary = sameTemplates.map(function (workout, i) {
          if (workout._id.toString() === workoutID.toString()) {
            return [
              workout,
              sameTemplates[i + 1] ? sameTemplates[i + 1] : null,
            ];
          }
        })[0];

        return summary;
      } else {
        const data = await User.findOne({ _id: userID })
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
      }
    } catch (error) {
      return error;
    }
  },

  async getDataSummary(_, { userID }) {
    const {
      totalSetsCompleted,
      totalRepsCompleted,
      totalWeight,
      completedWorkouts,
    } = await User.findById(userID);

    return [
      { label: "total weight lifted", stat: totalWeight },
      { label: "repetitions", stat: totalRepsCompleted },
      { label: "sets", stat: totalSetsCompleted },
      { label: "workouts", stat: completedWorkouts.length },
    ];
  },

  async getUserSettings(_, { userID }) {
    const user = await User.findById(userID).select(
      "-completedExercises -completedWorkouts -password"
    );

    return user;
  },
};

export { Query };
