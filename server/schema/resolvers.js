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
    login: async function (parent, { username, password }, context, info) {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentails");
      }

      console.log(user);

      const dbData = await User.findOne({ password: password });

      if (!dbData) {
        throw new AuthenticationError("Incorrect credentails");
      }
      console.log(dbData);
      const token = signToken({
        username: dbData.username,
        _id: dbData._id,
      });

      return { token, dbData };
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

      console.log(user);

      const tokenData = { username: username, _id: user._id };

      const token = signToken(tokenData);

      console.log(token);

      return { token, user };
    },

    createTemplate: async function (parent, args, context, info) {
      const dbData = await Template.create(args);
      return dbData;
    },

    createExercise: async function (parent, args, context, info) {
      const dbData = await Exercise.create(args);

      return dbData;
    },
  },
};

module.exports = resolvers;
