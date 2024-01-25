import db from "../config/connection.js";
import { Exercise } from "../models/exercise.js";

const seedExercises = [
  {
    isUserCreated: false,
    exerciseName: "bench press",
    equipment: "barbell",
  },
  {
    isUserCreated: false,
    exerciseName: "close grip bench press",
    equipment: "barbell",
  },
  {
    isUserCreated: false,
    exerciseName: "tricep push down",
    equipment: "cable",
  },
  {
    isUserCreated: false,
    exerciseName: "push up",
    equipment: "bodyweight",
  },
  {
    isUserCreated: false,
    exerciseName: "hamstring curls",
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
  {
    isUserCreated: false,
    exerciseName: "cable chest fly",
    equipment: "cable",
  },
  {
    isUserCreated: false,
    exerciseName: "squat",
    equipment: "barbell",
  },
  {
    isUserCreated: false,
    exerciseName: "deadlift",
    equipment: "barbell",
  },
  {
    isUserCreated: false,
    exerciseName: "overhead press",
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
    exerciseName: "incline dumbell press",
    equipment: "dumbbell",
  },
  {
    isUserCreated: false,
    exerciseName: "pull up",
    equipment: "bodyweight",
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
    exerciseName: "leg press",
    equipment: "machine",
  },
  {
    isUserCreated: false,
    exerciseName: "face pull",
    equipment: "cable",
  },
  {
    isUserCreated: false,
    exerciseName: "bicep curl",
    equipment: "dumbbell",
  },
  {
    isUserCreated: false,
    exerciseName: "tricep extension",
    equipment: "barbell",
  },
  {
    isUserCreated: false,
    exerciseName: "barbell row",
    equipment: "barbell",
  },
];

db.once("open", async () => {
  try {
    await Exercise.deleteMany({});
    await Exercise.insertMany(seedExercises);
    await db.close();
  } catch (error) {
    console.error(`Error occured when seeding: ${error.message}`);
  }
});
