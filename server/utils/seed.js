// const db = require("../config/connection");
// const { Exercise } = require("../models/index");

// const seedExercises = [
//   { name: "Bench press" },
//   { name: "Squat" },
//   { name: "Deadlift" },
//   { name: "Overhead press" },
//   { name: "Hip thrust" },
//   { name: "Romanian deadlift" },
//   { name: "Incline dumbell press" },
//   { name: "Pull up" },
//   { name: "Lat pull down" },
//   { name: "Dumbell row" },
//   { name: "Leg press" },
//   { name: "Face pull" },
//   { name: "Bicep curl" },
//   { name: "Tricep extension" },
//   { name: "Barbell row" },
// ];

// db.once("open", async () => {
//   await Exercise.deleteMany({});
//   await Exercise.insertMany(seedExercises);
//   await db.close();
// });
