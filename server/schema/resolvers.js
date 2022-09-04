const { User, Exercise } = require("../models/index");
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

    getTemplates: async function (parent, { _id }, context, info) {
      const user = await User.findById(_id).populate("templates");

      console.log(user);

      return templates;
    },
  },

  Mutation: {
    login: async function (parent, { username, password }, context, info) {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentails");
      }

      const dbData = await User.findOne({ password: password });

      if (!dbData) {
        throw new AuthenticationError("Incorrect credentails");
      }

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

      const tokenData = { username: username, _id: user._id };

      const token = signToken(tokenData);

      return { token, user };
    },

    createTemplate: async function (parent, args, context, info) {
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

      return dbData;
    },
  },
};

module.exports = resolvers;
