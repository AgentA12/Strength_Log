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
        const template = await Template.findById(templateID).populate(
          "exercises"
        );

        const user = await User.findById(userID).populate({
          path: "progress.template",
          model: "Template",
          populate: {
            path: "exercises",
            model: "Exercise",
          },
        });

        const totalWeight = template.exercises.reduce(
          (accumulator, { weight, reps, sets }) => {
            return (accumulator += weight * reps * sets);
          },
          0
        );

        let progress = user.progress.find(
          (processObj) =>
            processObj.template[0]._id.toString() == templateID.toString()
        );

        progress.totalWeight = totalWeight;

        const test = [];

        test.push(progress);

        return test;
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
        console.log(args);
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

    editTemplate: async function (
      _,
      { _id, templateName, templateNotes, exercises }
    ) {
      try {
        await Template.findByIdAndUpdate(
          _id,
          {
            templateName: templateName,
            templateNotes: templateNotes,
            $set: { exercises: exercises },
          },

          { new: true }
        );

        // //checks to see if an exercise is removed and saves removed exercises to variable
        // const deletedExercises = template.exercises.filter((exercise) => {
        //   return !exercises.find(
        //     (__exercise) => exercise._id.toString() === __exercise._id
        //   );
        // });

        // console.log(`${deletedExercises}\n`);

        // deletedExercises.forEach(async (deletedExercise) => {
        //   await Exercise.deleteOne({ _id: deletedExercise._id });
        // });

        // //updates exercises by id and create new exercises if Exercise model returns null on update
        // await exercises.map(async (exercise) => {
        //   const newExercise = await Exercise.findByIdAndUpdate(exercise._id, {
        //     exerciseName: exercise.exerciseName,
        //     weight: exercise.weight,
        //     sets: exercise.sets,
        //     reps: exercise.reps,
        //     type: exercise.type,
        //   });

        //   if (!newExercise) {
        //     const createdExercise = await Exercise.create(exercise);

        //     console.log(createdExercise);

        //     await Template.findByIdAndUpdate(_id, {
        //       $push: { exercises: createdExercise._id },
        //     });
        //   }
        // });

        return Template.findById(_id);
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },

    deleteTemplate: async function (_, { templateId }) {
      const res = await Template.deleteOne({ _id: templateId });

      await User.updateOne({
        $pull: { progress: { templates: templateId } },
        $pull: { templates: templateId },
      });

      return res;
    },

    saveWorkout: async function (_, { templateId, userID, exerciseInput }) {
      try {
        console.log(templateId, userID, exerciseInput);

        let template = await Template.findById(templateId);

        console.log(template);

        await User.findByIdAndUpdate(userID, {
          $push: {
            progress: { template: templateId },
          },
        });

        const progressAry = await User.find({
          "progress.template": templateId,
        }).populate("templates");

        return { username: progressAry[0].username };
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = resolvers;
