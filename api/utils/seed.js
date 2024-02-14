import db from "../config/connection.js";
import { Exercise } from "../models/exercise.js";

const seedExercises = [
  {
    isUserCreated: false,
    exerciseName: "barbell bench press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "incline barbell bench press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "decline barbell bench press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "close grip barbell bench press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "dumbbell press",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "incline dumbell press",
    equipment: "dumbbell",
  },

  { isUserCreated: false, exerciseName: "weighted dips", equipment: "machine" },

  {
    isUserCreated: false,
    exerciseName: "cable chest fly",
    equipment: "cable",
  },

  {
    isUserCreated: false,
    exerciseName: "push up",
    equipment: "bodyweight",
  },

  {
    isUserCreated: false,
    exerciseName: "tricep push down",
    equipment: "cable",
  },

  {
    isUserCreated: false,
    exerciseName: "tricep extension",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "seated overhead press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "standing overhead press",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "cable lateral raises",
    equipment: "cable",
  },

  {
    isUserCreated: false,
    exerciseName: "dumbbell lateral raises",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "machine reverse fly",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "rear delt fly",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "face pull",
    equipment: "cable",
  },

  {
    isUserCreated: false,
    exerciseName: "weighted pull up",
    equipment: "weight belt",
  },

  {
    isUserCreated: false,
    exerciseName: "barbell row",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "lat pull down",
    equipment: "cable",
  },

  {
    isUserCreated: false,
    exerciseName: "dumbell row",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "machine assisted row",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "bicep curl",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "incline bicep curl",
    equipment: "dumbbell",
  },

  { isUserCreated: false, exerciseName: "cable crunch", equipment: "cable" },

  { isUserCreated: false, exerciseName: "plank", equipment: "bodyweight" },

  {
    isUserCreated: false,
    exerciseName: "squat",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "dumbbell lunge",
    equipment: "dumbbell",
  },

  {
    isUserCreated: false,
    exerciseName: "barbell lunge",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "deadlift",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "hip thrust",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "romanian deadlift",
    equipment: "barbell",
  },

  {
    isUserCreated: false,
    exerciseName: "leg press",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "quad extensions",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "hamstring curls",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "abductor machine",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "adductor machine",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "standing calf raises",
    equipment: "machine",
  },

  {
    isUserCreated: false,
    exerciseName: "seated calf raises",
    equipment: "machine",
  },
];

db.once("open", async () => {
  try {
    console.log("-------------------------------------");

    console.log("Starting Exercise seeding...\n");

    await Exercise.deleteMany({});
    console.log("Cleaning exercises \n");

    await Exercise.insertMany(seedExercises);
    console.log("Inserting exercises\n");

    await db.close();
    console.log("Exercises were successfully seeded\n");
  } catch (error) {
    console.error(`Error occured when seeding: ${error.message}`);
    console.error(error);
  }
});
