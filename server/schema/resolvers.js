const { User, Template, Exercise } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async function () {
      return User.find({}).populate({
        path: "templates",
        populate: {
          path: "exercises",
          model: "Exercise",
        },
      });
    },

    getUserById: async function (_, { _id }) {
      const user = await User.findById(_id)
        .select("-password")
        .populate({
          path: "templates",
          populate: {
            path: "exercises",
            model: "Exercise",
          },
        });

      return user;
    },

    getTemplates: async function (_, { userId }) {
      const user = await User.findById(userId)
        .select("-password")
        .populate({
          path: "templates",
          populate: {
            path: "exercises",
            model: "Exercise",
          },
        });

      return user;
    },
  },

  Mutation: {
    login: async function (_, { username, password }) {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentails");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentails");
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

    //create a template then push the templates id to the userModel that created it
    createTemplate: async function (_, args) {
      try {
        const exercisesData = await Exercise.create(args.exercises);

        const exerciseIds = exercisesData.map((exercise) => {
          return exercise._id;
        });

        const templatePayload = {
          exercises: exerciseIds,
          templateName: args.templateName,
        };

        const template = await Template.create(templatePayload);

        const { _id: templateId } = template;

        await User.findByIdAndUpdate(
          args.userId,
          { $push: { templates: [templateId] } },
          { new: true }
        );

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
        return error;
      }
    },

    deleteTemplate: async function (_, { templateId }) {
      const result = await Template.deleteOne({ _id: templateId });
    },
  },
};

module.exports = resolvers;
