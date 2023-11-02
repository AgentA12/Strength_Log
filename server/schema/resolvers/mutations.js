const { User, Template } = require("../../models/index");

const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../../utils/auth");

const Mutation = {
  login: async function (_, { username, password }) {
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new AuthenticationError("incorrect username");
    }

    const correctPassword = await user.isCorrectPassword(password);

    if (!correctPassword) {
      throw new AuthenticationError("incorrect password");
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
      console.log(args);
      // if the templateName already exists return an error saying so

      
      const tempPayload = {
        belongsTo: args.userId,
        templateName: args.templateName,
        templateNotes: args.templateNotes,
        exercises: args.exercises.map((e) => {
          return {
            exercise: e._id,
            sets: e.sets,
            restTime: e.restTime ? e.restTime : null,
          };
        }),
      };

      const temp = await Template.create(tempPayload);

      await User.findByIdAndUpdate(args.userId, {
        $push: { templates: [temp._id] },
      });

      return args.templateName;
    } catch (error) {
      return error.message;
    }
  },

  editTemplate: async function (_, args) {
    try {
      const template = await Template.findByIdAndUpdate(
        args.templateId,
        {
          templateName: args.templateName,
          templateNotes: args.templateNotes,
          exercises: args.exercises.map((exercise, i) => {
            return {
              exercise: exercise.exercise[0]._id,
              sets: exercise.sets.map((set) => set),
            };
          }),
        },

        { new: true }
      );

      return template;
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

  saveWorkout: async function (_, { templateId, userID, exercises }) {
    try {
      const user = await User.findByIdAndUpdate(
        userID,
        {
          $push: {
            completedWorkouts: {
              template: templateId,
              exercises: exercises.map((exercise) => {
                return {
                  exercise: exercise.exercise._id,
                  sets: [...exercise.sets],
                };
              }),
            },
          },
        },
        { new: true }
      ).select("-password");

      await User.findByIdAndUpdate(userID, {
        $push: {
          completedExercises: exercises.map((exercise) => {
            return {
              exercise: exercise.exercise._id,
              sets: exercise.sets.map((set) => set),
              belongsTo: templateId,
              savedOn: new Date(),
            };
          }),
        },
      });

      return user;
    } catch (error) {
      return error.message;
    }
  },

  deleteAccount: async function (_, { userID }) {
    try {
      const user = await User.findByIdAndDelete(userID);

      if (user) {
        return { confirm: true };
      }
      return { confirm: false };
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = Mutation;
