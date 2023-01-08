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

      return user.templates;
    },

    getProgress: async function (_, { templateID, userID }) {
      try {
        const user = await User.findById(userID);

        const progress = user.getProgress(templateID);

        return progress;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    getTemplateProgressForUser: async function (_, { userId }) {
      const user = await User.findById(userId)
        .select("-password")
        .populate({
          path: "templates",
          populate: {
            path: "exercises",
            model: "Exercise",
          },
        });

      return user.templates;
    },

    exerciseProgress: async function (_, args) {
      const t = await User.findById(args.userId).sort({
        "progress.createdAt": "asc",
      });
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
          exercises: args.exercises,
          templateName: args.templateName,
          templateNotes: args.templateNotes,
        };

        const template = await Template.create(templatePayload);

        const { _id: templateId } = template;

        await User.findByIdAndUpdate(args.userId, {
          $push: { templates: [templateId] },
        });

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
        return error.message;
      }
    },

    editTemplate: async function (_, args) {
      try {
        await Template.findByIdAndUpdate(
          args._id,
          {
            templateName: args.templateName,
            templateNotes: args.templateNotes,
            $set: { exercises: args.exercises },
          },

          { new: true }
        );

        return Template.findById(args._id);
      } catch (error) {
        return error.message;
      }
    },

    deleteTemplate: async function (_, { templateId }) {
      try {
        const res = await Template.deleteOne({ _id: templateId });

        await User.updateOne({
          $pull: { templates: templateId },
        });

        return res;
      } catch (error) {
        return error.message;
      }
    },

    saveWorkout: async function (_, { templateId, userID, exerciseInput }) {
      try {
        const template = await Template.findById(templateId);

        const user = await User.findByIdAndUpdate(
          userID,
          {
            $push: {
              progress: {
                templateName: template.templateName,
                exercises: exerciseInput,
                templateId: templateId,
              },
            },
          },
          { new: true }
        ).select("-password");

        return user;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = resolvers;
