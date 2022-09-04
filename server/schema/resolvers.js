const { User, Exercise } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");
const { bcrypt } = require("bcrypt");

const resolvers = {
  Query: {
    getAllUsers: async function () {
      return User.find({});
    },

    getUser: async function (_, { _id }) {
      const user = await User.findById(_id)
        .select("-password")
        .populate("templates");

      return user;
    },

    getTemplates: async function (_, { _id }) {
      const user = await User.findById(_id).populate("templates");

      return templates;
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

    createTemplate: async function (_, args) {
      console.log(args);
      const dbData = await User.updateOne(
        { _id: args._id },
        {
          $push: {
            templates: {
              templateName: args.templateName,
              exercises: {
                exerciseName: args.exerciseName,
                reps: args.reps,
                sets: args.sets,
              },
            },
          },
        }
      );
      console.log(dbData);

      return dbData;
    },
  },
};

module.exports = resolvers;
