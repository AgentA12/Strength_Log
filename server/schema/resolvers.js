
const { User, Exercise, Template } = require("../models/index");

const resolvers = {
  Query: {
    getUser: async function (parent, args, context, info) {
      const user = await User.findOne({});
      console.log(user);
      return user;
    },
    getTemplate: async function (parent, args, context, info) {
      const templates = await Template.find().populate("exercises");
      console.log(templates);
      return templates[0];
    },
    getExercise: async function (parent, args, context, info) {},
  },

  Mutation: {
    createUser: async function (parent, args, context, info) {
      const dbData = await User.create(args);
      return dbData;
    },

    createTemplate: async function (parent, args, context, info) {
      console.log(args);
      const dbData = await Template.create(args);
      console.log(dbData);
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
