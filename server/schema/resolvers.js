const { User, Exercise } = require("../models/index");

const resolvers = {
  Query: {
    exercise: () => User.find({}),
    user: () => Exercise.find({}),
  },

  Mutation: {
    createUser: async (parent, args, context, info) => {
      const dbData = await User.create(args);
      return dbData;
    },
  },
};

module.exports = resolvers;
