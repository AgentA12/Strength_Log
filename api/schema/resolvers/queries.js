import {
  formatChartData,
  getOneRepMax as calcOneRepMax,
} from "../../utils/helpers.js";
import { User, Exercise, Template } from "../../models/index.js";

const Query = {
  calendarTimeStamps: async function (_, { userId, templateName }) {
    try {
      const { completedWorkouts: dates } = await User.findById(userId)
        .select(
          "completedWorkouts._id completedWorkouts.createdAt compareWorkouts.template.templateName"
        )
        .populate({
          path: "completedWorkouts.template",
          select: "templateName",
        });

      let datess = dates;

      if (templateName)
        datess = dates.filter(
          (date) => date.template.templateName === templateName
        );

      return datess.length ? datess : [];
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
          map[dataSet[i].label] = [{ x: dataSet[i].x, y: dataSet[i].y }];
        } else {
          map[dataSet[i].label].push({
            x: dataSet[i].x,
            y: dataSet[i].y,
          });
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

  async compareWorkouts(_, { userID, workoutID }) {
    try {
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

      const originalTemplate = await Template.findById(templateID)
        .populate({ model: "Exercise", path: "exercises.exercise" })
        .select("-belongsTo");

      const sameTemplates = completedWorkouts
        .filter(
          (workout) =>
            workout?.template?._id?.toString() === templateID.toString()
        )
        .sort((a, b) => b.createdAt - a.createdAt);

      let summary;

      for (let i = 0; i < sameTemplates.length; i++) {
        if (sameTemplates[i]._id.toString() === workoutID.toString()) {
          summary = {
            formerWorkout: sameTemplates[i],
            hasLatterWorkout: sameTemplates[i + 1] ? true : false,
            latterWorkout: sameTemplates[i + 1] ? sameTemplates[i + 1] : null,
          };
        }
      }

      summary.originalTemplate = originalTemplate;
      return summary;
    } catch (error) {
      return error;
    }
  },

  // this resolver is use to get a complete list of recent workouts AND to get a single workout,
  // if the workoutID is present (not undefined or null) its querying a single workout
  async getProgressByDate(_, { userID, workoutID }) {
    try {
      if (workoutID) {
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

        return completedWorkouts.find(
          (workout) => workout._id.toString() === workoutID
        );
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
    const user = await User.findById(userID);

    const {
      totalSetsCompleted,
      totalRepsCompleted,
      totalWeight,
      completedWorkouts,
    } = user;

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

  async getOneRepMax(_, { exerciseName = "bench press", userID }) {
    // find the best set in the users completed workouts or exercises

    try {
      const { completedExercises } = await User.findById(userID)
        .populate("completedExercises.exercise")
        .select(
          "completedExercises.exercise completedExercises.sets completedExercises._id"
        );

      const exercises = completedExercises.filter(
        (exercise) => exercise.exercise.exerciseName === exerciseName
      );

      let greatest = 0;
      exercises.map((exercise) => {
        exercise.sets.map((set) => {
          if (calcOneRepMax(set.weight, set.reps) > greatest) {
            greatest = calcOneRepMax(set.weight, set.reps);
          }
        });
      });

      return greatest;
      // const result = await User.aggregate([
      //   {
      //     $lookup: {
      //       from: "exercise", // The name of the referenced collection (case-sensitive)
      //       localField: "completedExercises.exercise",
      //       foreignField: "_id",
      //       as: "exerciseInfo",
      //     },
      //   },
      //   {
      //     $match: {
      //       "exerciseInfo.exerciseName": "bench press",
      //     },
      //   },

      //   {
      //     $project: {
      //       _id: 0,
      //       itemName: "$exercise.product",
      //       itemQuantity: "$items.quantity",
      //     },
      //   },
      // ]);
      return 500;
    } catch (error) {
      return error.message;
    }
  },

  isCorrectPass: async function (_, { userID, password }) {
    try {
      const user = await User.findById(userID);

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        return false;
      }

      return true;
    } catch (error) {
      return error;
    }
  },
};

export { Query };
