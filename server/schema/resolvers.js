const { User, Template, Exercise } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getProgressTimeStamps: async function (_, { userId }) {
      try {
        const { progress } = await User.findById(userId)
          .select("-password")
          .populate({
            path: "templates",
            populate: {
              path: "exercises",
              model: "Exercise",
            },
          });

        const dates = progress.map((p) => {
          return {
            date: p.createdAt,
            templateId: p._id,
          };
        });

        return { dates: dates };
      } catch (error) {}
    },

    getTemplatesForUser: async function (_, { userId }) {
      try {
        const user = await User.findById(userId)
          .select("-password")
          .populate({
            path: "templates",
            populate: {
              path: "exercises",
              model: "Exercise",
            },
          });

        return user.templates;
      } catch (error) {
        return error;
      }
    },

    getProgress: async function (_, { templateName, userID }) {
      try {
        const user = await User.findById(userID);

        const progress = user.getProgress(templateName);

        return progress;
      } catch (error) {
        return error;
      }
    },

    getChartData: async function (_, args) {
      const { progress } = await User.findById(args.userId).select("progress");

      const userProgress = progress.filter((p) => {
        return p.templateName === args.templateName;
      });

      userProgress.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

      const labels = userProgress.map((progressObject) => {
        return progressObject.dateCompleted;
      });

      let copyUserProgress = [...userProgress];

      copyUserProgress.forEach((resultObj, i) => {
        let total = resultObj.exercises.reduce(
          (accumulator, { weight, reps, sets }) => {
            return (accumulator += weight * reps * sets);
          },
          0
        );

        copyUserProgress[i].totalWeight = total;
      });

      let totalWeight = copyUserProgress.map((c) => {
        return c.totalWeight;
      });

      return { labels: labels, totalWeights: totalWeight };
    },

    async getExerciseProgress(_, { templateID, userID }) {
      const user = await User.findById(userID);
      const chartData = user.ExerciseProgress(templateID);

      return chartData;
    },

    async getSummary(_, { userId, templateId, progressId }) {
      const user = await User.findById(userId);

      const progress = user.getSortedProgress(templateId, "asc");

      function getRecentComparison(aryOfRecents, progressId) {
        let variable = [];

        aryOfRecents.forEach((recentObj, i) => {
          if (recentObj._id.toString() === progressId) {
            // if true we are at the first progressObj in array and there is no recent to compare
            // so only push the current recentObj data
            if (aryOfRecents.length - 1 === i) {
              variable.push(recentObj);
            } else {
              // else push the current and previous
              variable.push(recentObj);
              variable.push(aryOfRecents[i + 1]);
            }
          }
        });
        // if length is 1 we are only getting the first saved template so we dont need to get the difference
        if (variable.length <= 1) return variable;

        // compare exercise weight and add difference
        variable[0].exercises.forEach((exercise, i) => {
          variable[1].exercises[i].dif =
            exercise.weight - variable[1].exercises[i].weight;
        });

        return variable;
      }

      const summary = getRecentComparison(progress, progressId);

      return summary;
    },

    getRecentlyCompletedCarouselData: async function (_, { userID }) {
      const { progress } = await User.findById(userID)
        .select("progress")
        .sort("-date");

      let sortedProgress = progress
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .slice(0, 8);

      // const userTemplates = await User.findById(userID)
      //   .select("templates")
      //   .populate({
      //     path: "templates",
      //     populate: {
      //       path: "exercises",
      //       model: "Exercise",
      //     },
      //   });

      // for (let i = 0; i < progress.length; i++) {

      // }

      // const twoMostRecentWorkout = sortedProgress
      //   .filter((workout) => {
      //     if (
      //       sortedProgress[0].templateId.toString() ===
      //       workout.templateId.toString()
      //     )
      //       return workout;
      //   })

      //   .slice(0, 2);

      // compareExercises(

      //   twoMostRecentWorkout[0].exercises,
      //   twoMostRecentWorkout[1].exercises
      // );

      return [
        {
          dateCompleted: "",
          templateName: "lower body",
          date: "",
          totalVolume: "",
          diff: "",
          prs: [{ reps: "", sets: "", weight: "" }],
        },
        {
          dateCompleted: "",
          templateName: "upper body",
          date: "",
          totalVolume: "",
          diff: "",
          prs: [{ reps: "", sets: "", weight: "" }],
        },
        {
          dateCompleted: "",
          templateName: "legs",
          date: "",
          totalVolume: "",
          diff: "",
          prs: [{ reps: "", sets: "", weight: "" }],
        },
      ];
    },
  },

  Mutation: {
    login: async function (_, { username, password }) {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken({
        username: user.username,
        _id: user._id,
      });

      return { token, user };
    },

    createUser: async function (_, { username, password }) {
      const isUsernameTaken = await User.findOne({ username: username });

      if (isUsernameTaken) {
        throw new AuthenticationError("Username is taken");
      }

      const user = await User.create({
        username: username,
        password: password,
      });

      const tokenData = { username: username, _id: user._id };

      const token = signToken(tokenData);

      return { token, user };
    },

    createTemplate: async function (_, args) {
      try {
        await Exercise.create(args.exercises);

        const templatePayload = {
          exercises: args.exercises,
          templateName: args.templateName,
          templateNotes: args.templateNotes,
        };

        const template = await Template.create(templatePayload);

        const { _id: templateId } = template;

        await User.findByIdAndUpdate(args.userId, {
          $push: { templates: [templateId] },
        });

        const userData = await User.findById(args.userId).populate({
          path: "templates",
          populate: {
            path: "exercises",
            model: "Exercise",
          },
        });

        const { templates } = userData;

        return templates;
      } catch (error) {
        return error.message;
      }
    },

    editTemplate: async function (_, args) {
      try {
        await Template.findByIdAndUpdate(
          args._id,
          {
            templateName: args.templateName,
            templateNotes: args.templateNotes,
            $set: { exercises: args.exercises },
          },

          { new: true }
        );

        return Template.findById(args._id);
      } catch (error) {
        return error.message;
      }
    },

    deleteTemplate: async function (_, { templateId }) {
      try {
        const template = await Template.findById(templateId);

        const res = await Template.deleteOne({ _id: templateId });

        await User.updateOne({
          $pull: { templates: templateId },
        });

        return { ...res, templateName: template.templateName };
      } catch (error) {
        return error.message;
      }
    },

    saveWorkout: async function (_, { templateId, userID, exerciseInput }) {
      try {
        const template = await Template.findById(templateId);

        const user = await User.findByIdAndUpdate(
          userID,
          {
            $push: {
              progress: {
                templateName: template.templateName,
                exercises: exerciseInput,
                templateId: templateId,
              },
            },
          },
          { new: true }
        ).select("-password");

        return user;
      } catch (error) {
        return error.message;
      }
    },

    deleteAccount: async function (_, { userID }) {
      const user = await User.findByIdAndDelete(userID);

      if (user) {
        return { confirm: true };
      } else {
        return { confirm: false };
      }
    },
  },
};

module.exports = resolvers;
