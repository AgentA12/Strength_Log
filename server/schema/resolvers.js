const { User, Exercise, Template } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async function (parent, args, context, info) {
      return User.find({}).select("-password");
    },

    getUser: async function (parent, { _id }, context, info) {
      const user = await User.findById(_id)
        .select("-password")
        .populate("templates");

      return user;
    },

    getTemplate: async function (parent, { _id }, context, info) {
      const dbData = User.findById({ _id }).select("templates");
      return dbData;
    },

    getExercise: async function (parent, args, context, info) {
      const dbData = await Exercise.find({});

      return dbData;
    },
  },

  Mutation: {
    login: async function (parent, args, context, info) {
      console.log(args);
    },

    createUser: async function (parent, { username, password }, context, info) {
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

    createTemplate: async function (parent, args, context, info) {
      const dbData = await Template.create(args);
      return dbData;
    },

    createExercise: async function (parent, args, context, info) {
      console.log(args);
      const dbData = await Exercise.create(args);
      console.log(dbData);
      return dbData;
    },
  },
};

module.exports = resolvers;
