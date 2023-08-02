const { User, Template, Exercise } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");
const { getDaysArray } = require("../utils/helpers");

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
      } catch (error) {
        return error;
      }
    },

    getTemplates: async function (_, { userId }) {
      try {
        const { templates } = await User.findById(userId)
          .select("-password")
          .populate({
            path: "templates",
            populate: {
              path: "exercises",
              model: "Exercise",
            },
          });

        return templates;
      } catch (error) {
        return error;
      }
    },

    getTemplateDataForProgressPage: async function (
      _,
      { templateId, userId, range, metric, exercise }
    ) {
      try {
        console.log(templateId, userId, exercise, range, metric);

        const { progress } = await User.findById(userId);

        // getting the most recently saved workouts date "2023-05-20"
        const mostRecentlySavedDate = progress.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1
        )[0].createdAt;

        let dateArray = getRangeArray(range, mostRecentlySavedDate);
        console.log(a(progress, dateArray));

        function getRangeArray(range, mostRecentlySavedDate) {
          //depending on the range generate a range of dates
          switch (range) {
            case "Last 12 months":
              return getDaysArray(
                new Date(
                  mostRecentlySavedDate.setFullYear(
                    mostRecentlySavedDate.getFullYear() - 1
                  )
                ),
                new Date()
              ).map((d) => d);

            case "Last 6 months":
              return getDaysArray(
                new Date(
                  mostRecentlySavedDate.setMonth(
                    mostRecentlySavedDate.getMonth() - 6
                  )
                ),
                new Date()
              ).map((d) => d);

            case "Last 3 months":
              return getDaysArray(
                new Date(
                  mostRecentlySavedDate.setMonth(
                    mostRecentlySavedDate.getMonth() - 3
                  )
                ),
                new Date()
              ).map((d) => d);

            case "Last month":
              return getDaysArray(
                new Date(
                  mostRecentlySavedDate.setMonth(
                    mostRecentlySavedDate.getMonth() - 1
                  )
                ),
                new Date()
              ).map((d) => d);

            default:
              return getDaysArray(
                new Date(mostRecentlySavedDate),
                new Date()
              ).map((d) => d);
          }
        }

        function a(progressAry, dateAry) {
          const b = [];

          for (let i = 0; i < dateAry.length; i++) {
            for (let x = 0; x < progressAry.length; x++) {
              if (checkIfSameDay(dateAry[i], progressAry[x].createdAt)) {
                const { exercises } = progress[x];
                b.push({ labels: dateAry[i], data: [...exercises] });
              } else {
                b.push({ labels: dateAry[i], data: null });
              }
            }
          }
          return b;
        }

        function checkIfSameDay(date1, date2) {
          return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear() &&
            date1.getDay() === date2.getDay()
            ? true
            : false;
        }

        return [{}];
      } catch (error) {
        return error;
      }
    },

    async getMostRecentlySavedTemplateData(_, { templateId, userId }) {
      const { progress } = await User.findById(userId);

      const mostRecent = progress
        .filter(
          (progressObj) => progressObj.templateId.toString() === templateId
        )
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0];

      // if mostRecent is is null or undefined the user hasn't save a workout with that template
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

        // remove deleted template from user.progress schema

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
