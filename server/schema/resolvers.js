const { User, Template, Exercise } = require("../models/index");
const { AuthenticationError } = require("apollo-server");
const { signToken } = require("../utils/auth");
const { execute } = require("graphql");
const e = require("express");

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

    getAllTemplates: async function () {
      return Template.find().populate("exercises");
    },

    getAllExercises: async function () {
      return Exercise.find();
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

    getTemplatesForUser: async function (_, { userId }) {
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

    //create a template then push the new template ids to the User model
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

    editTemplate: async function (_, { _id, templateName, exercises }) {
      await Template.findByIdAndUpdate(_id, {
        templateName: templateName,
      });

      const template = await Template.findById(_id).populate("exercises");

      //checks to see if an exercise is removed and saves removed exercises to variable
      const deletedExercises = template.exercises.filter((exercise) => {
        return !exercises.find(
          (__exercise) => exercise._id.toString() === __exercise._id
        );
      });

      deletedExercises.forEach(async (deletedExercise) => {
        await Exercise.deleteOne({ _id: deletedExercise._id });
      });

      //updates exercises by id and create new exercises if Exercise model returns null on update
      await exercises.map(async (exercise) => {
        const newExercise = await Exercise.findByIdAndUpdate(exercise._id, {
          exerciseName: exercise.exerciseName,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
        });

        if (!newExercise) {
          const createdExercise = await Exercise.create(exercise);

          await Template.findByIdAndUpdate(_id, {
            $push: { exercises: createdExercise._id },
          });
        }
      });

      return Template.findById(_id).populate("exercises");
    },

    deleteTemplate: async function (_, { templateId }) {
      await Template.deleteOne({ _id: templateId });
    },
  },
};

module.exports = resolvers;
