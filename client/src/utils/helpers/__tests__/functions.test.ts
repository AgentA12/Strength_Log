import { describe, it, expect } from 'vitest';

import {
  getOneRepMax,
  compareDatesByDay,
  getDaysArray,
  getRangeOfDates,
  findFirstAndLastRange,
  getTotalVolume,
  formatTime,
  getTotalReps,
  getTotalSets,
  getPercentageOf1RM,
  getRandomInt,
  formatWorkoutState,
  getTotalVolumeForExercise,
  getPrimaryColor,
  formatDate,
  compareExerciseSets,
  compareWorkouts,
} from "../functions";
import { ExerciseShape } from '../../../types/template';

describe("getOneRepMax works correctly", () => {
  it("returns one rep max", () => {
    expect(getOneRepMax(225, 10)).toEqual(300);
    expect(getOneRepMax(315, 20)).toEqual(668);
    expect(getOneRepMax(315, 0)).toEqual(null);
    expect(getOneRepMax(0, 20)).toEqual(null);
    expect(getOneRepMax(0, -550)).toEqual(null);
    expect(getOneRepMax(0, -1)).toEqual(null);
  });
});


describe("getPercentageOf1RM works", () => {
  it("getPercentageOf1RM returns exact correct data", () => {
    const oneRepMax = 324;
    const expectedData = [
      { weight: 324, percentage: 100, reps: 1 },
      { percentage: 95, reps: 2, weight: 307.8 },
      { percentage: 90, reps: 4, weight: 291.6 },
      { percentage: 85, reps: 6, weight: 275.4 },
      { percentage: 80, reps: 8, weight: 259.2 },
      { percentage: 75, reps: 10, weight: 243 },
      { percentage: 70, reps: 12, weight: 226.8 },
      { percentage: 65, reps: 16, weight: 210.6 },
      { percentage: 60, reps: 20, weight: 194.4 },
      { percentage: 55, reps: 24, weight: 178.2 },
      { percentage: 50, reps: 30, weight: 162 },
    ];

    const result = getPercentageOf1RM(oneRepMax);

    expect(result).toEqual(expectedData);
  })
});


describe("compareDatesByDay works", () => {
  it("checks if two given dates fall on the same day", () => {
    expect(compareDatesByDay(new Date(), new Date())).toBeTruthy();

    expect(compareDatesByDay(new Date(), new Date("2022-05-10"))).toBeFalsy();

    expect(
      compareDatesByDay(new Date("1998-03-11"), new Date("1998-03-10"))
    ).toBeFalsy();

    expect(
      compareDatesByDay(new Date("1998-03-11"), new Date("1998-03-11"))
    ).toBeTruthy();

    expect(
      compareDatesByDay(
        new Date("11 Mar 1998 00:00:00 GMT"),
        new Date("1998-03-11")
      )
    ).toBeTruthy();
  });
});

describe("getDaysArray works", () => {
  it("returns the array of dates in specified range", () => {
    const firstDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-05');

    const result = getDaysArray(firstDate, endDate);

    expect(result.length).toEqual(5);

    result.forEach(date => {
      expect(date instanceof Date).toBe(true)
    });
  })
});


describe("getTotalReps works", () => {
  const mockExercises: ExerciseShape[] = [
    {
      restTime: 180,
      exercise: { _id: "", exerciseName: "benchpress", equipment: "barbell", isUserCreated: false },
      sets: [{ reps: 5, weight: 55 }, { reps: 8, weight: 55 }, { reps: 10, weight: 55 }, { reps: 3, weight: 55 }, { reps: 15, weight: 55 }],
    },
  ];
  it("returns the total reps of a given exercise", () => {
    expect(getTotalReps(mockExercises)).toEqual(41);
  });
});

describe("getTotalSets works", () => {
  const mockExercises: ExerciseShape[] = [
    {
      restTime: 180,
      exercise: { _id: "", exerciseName: "benchpress", equipment: "barbell", isUserCreated: false },
      sets: [{ reps: 5, weight: 55 }, { reps: 8, weight: 55 }, { reps: 10, weight: 55 }, { reps: 3, weight: 55 }, { reps: 15, weight: 55 }],
    },
  ];
  it("returns the total number of sets", () => {
    expect(getTotalSets(mockExercises)).toEqual(5);
  });
});

describe("getTotalVolume works", () => {
  const mockExercises: ExerciseShape[] = [
    {
      restTime: 180,
      exercise: { _id: "", exerciseName: "benchpress", equipment: "barbell", isUserCreated: false },
      sets: [
        { reps: 5, weight: 225 },
        { reps: 8, weight: 135 },
        { reps: 10, weight: 55 },
        { reps: 3, weight: 405 },
        { reps: 15, weight: 135 },
      ],
    },
  ];
  it("returns the total volume", () => {
    expect(getTotalVolume(mockExercises)).toEqual(5995);
  });
});

describe("formatTime works", () => {
  it("formats the time correctly", () => {
    expect(formatTime(5)).toMatch("05");
    expect(formatTime(30)).toMatch("30");
    expect(formatTime(30)).toMatch("30");
    expect(formatTime(0)).toMatch("00");
  });
});


describe("getRangeOfDates works", () => {
  it("returns the correct dates", () => {
    const firstDate = 1704961412690, secondDate = 1706179276346;
    const range = "all time"

    const dates = getRangeOfDates(range, firstDate, secondDate)

    const expectedDates = [
      "Wed Jan 10 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Thu Jan 11 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Fri Jan 12 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Sat Jan 13 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Sun Jan 14 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Mon Jan 15 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Tue Jan 16 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Wed Jan 17 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Thu Jan 18 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Fri Jan 19 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Sat Jan 20 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Sun Jan 21 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Mon Jan 22 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Tue Jan 23 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Wed Jan 24 2024 03: 23: 32 GMT-0500(Eastern Standard Time)",
      "Thu Jan 25 2024 03: 23: 32 GMT-0500(Eastern Standard Time)"]


    expect(dates.length).toEqual(16);
    dates.forEach(date => expect(date instanceof Date).toEqual(true));
    dates.forEach((date, i) => expect(new Date(date)).toEqual(new Date(expectedDates[i])));
  })
})

describe("findFirstAndLastRange works", () => {
  it('returns correct range for valid input', () => {
    const dataSet = [
      { x: '20220101', y: 1 },
      { x: '20220103', y: 2 },
      { x: '20220102', y: 3 },
    ];

    const result = findFirstAndLastRange(dataSet);

    expect(result).toEqual([20220101, 20220103]);
  });

  it('returns [Infinity, 0] for empty dataSet', () => {
    const dataSet: any = [];

    const result = findFirstAndLastRange(dataSet);

    expect(result).toEqual([Infinity, 0]);
  });

  it('handles dataSet with non-numeric values', () => {
    const dataSet = [
      { x: '20220101', y: 1 },
      { x: 'invalidDate', y: 2 },
      { x: '20220102', y: 3 },
    ];

    const result = findFirstAndLastRange(dataSet);

    expect(result).toEqual([20220101, 20220102]);
  });
});

describe('getTotalVolumeForExercise function', () => {
  it('calculates total volume for a set of exercises', () => {
    const sets = [
      { weight: 100, reps: 5 },
      { weight: 80, reps: 8 },
      { weight: 120, reps: 6 },
    ];

    const result = getTotalVolumeForExercise(sets);

    expect(result).toEqual(100 * 5 + 80 * 8 + 120 * 6);
  });

  it('returns 0 for an empty set of exercises', () => {
    const sets: [] = [];

    const result = getTotalVolumeForExercise(sets);

    expect(result).toEqual(0);
  });
});

describe('getRandomInt function', () => {
  it('returns a random integer within the specified range', () => {
    const min = 5;
    const max = 10;

    const result = getRandomInt(min, max);

    // Check if the result is a string (formatted number)
    expect(typeof result).toBe('string');

    // Remove the commas and convert the string back to a number for comparison
    const numericResult = parseInt(result.replace(/,/g, ''), 10);

    // Check if the numeric result is within the specified range
    expect(numericResult).toBeGreaterThanOrEqual(min);
    expect(numericResult).toBeLessThanOrEqual(max);
  });

  it('returns 0 when min and max are both 0', () => {
    const min = 0;
    const max = 0;

    const result = getRandomInt(min, max);

    expect(result).toBe('0');
  });

  it('handles negative range properly', () => {
    const min = -10;
    const max = -5;

    const result = getRandomInt(min, max);

    // Check if the result is a string (formatted number)
    expect(typeof result).toBe('string');

    // Remove the commas and convert the string back to a number for comparison
    const numericResult = parseInt(result.replace(/,/g, ''), 10);

    // Check if the numeric result is within the specified range
    expect(numericResult).toBeGreaterThanOrEqual(min);
    expect(numericResult).toBeLessThanOrEqual(max);
  });
});


describe('getPrimaryColor function', () => {
  // Test case: Check if the function returns the correct primary color from the theme
  it('returns the primary color from the theme', () => {
    // Mock the MantineTheme type
    const mockTheme: any = {
      colors: {
        primaryColor: '#007bff', // Replace with your desired color
      },
    };
    const result = getPrimaryColor(mockTheme);

    // Assert that the result is equal to the expected primary color
    expect(result).toEqual('#007bff'); // Replace with your expected color
  });

  // Add more test cases as needed
});

// Test suite
describe('formatWorkoutState function', () => {
  // Test case: Check if the function formats the workout state correctly
  it('formats the workout state with completed set to false', () => {
    // Sample template object
    const template = {
      exercises: [
        {
          restTime: 60,
          sets: [{ weight: 50, reps: 10 }, { weight: 40, reps: 8 }],
          exercise: {
            exerciseName: 'Exercise 1',
            equipment: 'Dumbbell',
            isUserCreated: true,
            _id: 'someExerciseId',
          },
        },
        {
          restTime: 45,
          sets: [{ weight: 30, reps: 12 }, { weight: 20, reps: 15 }],
          exercise: {
            exerciseName: 'Exercise 2',
            equipment: 'Barbell',
            isUserCreated: false,
            _id: 'anotherExerciseId',
          },
        },
      ],
      templateName: 'Full Body Workout',
      templateNotes: 'A sample workout template',
      _id: 'someTemplateId',
    };

    // Call the function with the sample template
    const result = formatWorkoutState(template);

    // Expected formatted workout state
    const expected = {
      exercises: [
        {
          restTime: 60,
          completed: false,
          sets: [{ weight: 50, reps: 10, }, { weight: 40, reps: 8 }],
          exercise: {
            exerciseName: 'Exercise 1',
            equipment: 'Dumbbell',
            isUserCreated: true,
            _id: 'someExerciseId',
          },
        },
        {
          restTime: 45,
          completed: false,
          sets: [{ weight: 30, reps: 12 }, { weight: 20, reps: 15, }],
          exercise: {
            exerciseName: 'Exercise 2',
            equipment: 'Barbell',
            isUserCreated: false,
            _id: 'anotherExerciseId',
          },
        },
      ],
      templateName: 'Full Body Workout',
      templateId: 'someTemplateId',
    };

    // Assert that the result is equal to the expected formatted workout state
    expect(result).toEqual(expected);
  });

  // Add more test cases as needed
});

describe('formatDate function', () => {
  // Test case: Check if the function formats a valid date number correctly
  it('formats a valid date number correctly', () => {
    const validDateNumber = 1642246200000; // Equivalent to '2022-01-15T12:30:00Z'

    const result = formatDate(validDateNumber);

    // Assert that the result is a string in the expected format
    expect(result).toMatch("January 15, 2022 at 6:30 AM");
  });

  // Test case: Check if the function returns "Invalid Date" for NaN
  it('returns "Invalid Date" for NaN', () => {
    const invalidDateNumber = NaN;
    const result = formatDate(invalidDateNumber);

    // Assert that the result is "Invalid Date"
    expect(result).toBe('Invalid Date');
  });

  // Add more test cases as needed
});
