const { User, Template } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async function () {
      return User.find({}).populate("templates");
    },

    getUserById: async function (_, { _id }) {
      const user = await User.findById(_id)
        .select("-password")
        .populate("templates");

      return user;
    },

    getAllTemplates: async function () {
      const templates = await Template.find({});

      return templates;
    },
  },

  Mutation: {
    login: async function (_, { username, password }) {
      console.log(username, password);
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
      console.log(username, password);

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
        const { userId, templateName, exerciseName, reps, sets, weight } = args;

        const template = await Template.create({
          templateName: templateName,
          exercises: {
            exerciseName: exerciseName,
            reps: reps,
            sets: sets,
            weight: weight,
          },
        });

        const { _id: templateId } = template;

        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { templates: templateId } }
        );

        return template;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = resolvers;
