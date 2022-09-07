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
      console.log(userId)
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
    createTemplate: async function (
      _,
      { userId, templateName, exerciseName, reps, sets, weight }
    ) {
      try {
        const exercise = await Exercise.create({
          exerciseName,
          reps,
          sets,
          weight,
        });

        const { _id: exerciseId } = exercise;

        const template = await Template.create({
          templateName: templateName,
          exercises: exerciseId,
        });

        const { _id: templateId } = template;

        const user = await User.findByIdAndUpdate(
          userId,
          { $push: { templates: [templateId] } },
          { new: true }
        );

        return template;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = resolvers;
