const { User, Template, Exercise } = require("../../models/index");

const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../../utils/auth");

const Mutation = {
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
      console.log("called?");

      const tempPayload = {
        belongsTo: args.userId,
        templateName: args.templateName,
        templateNotes: args.templateNotes,
        exercises: args.exercises.map((e) => {
          return { exercise: e._id, sets: e.sets };
        }),
      };

      const temp = await Template.create(tempPayload);

      await User.findByIdAndUpdate(args.userId, {
        $push: { templates: [temp._id] },
      });

      return args.templateName;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },

  editTemplate: async function (_, args) {
    try {
      const template = await Template.findByIdAndUpdate(
        args._id,
        {
          templateName: args.templateName,
          templateNotes: args.templateNotes,
          $set: { exercises: args.exercises },
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
              exercises: [...exercises],
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
};

module.exports = Mutation;
