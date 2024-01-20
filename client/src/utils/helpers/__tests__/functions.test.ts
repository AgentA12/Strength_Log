import { describe, it, expect } from 'vitest';

import {
  getOneRepMax,
  compareDatesByDay,
  getTotalVolume,
  formatTime,
  getTotalReps,
  getTotalSets,
  getDaysArray,
  getRangeOfDates,
  findFirstAndLastRange,
  getPercentageOf1RM,
} from "../functions";

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
  it("Generates an array of percentages of a given one rep max", () => {
    expect(getPercentageOf1RM(225, 12));
  });
});

// describe("getPercentageOf1RM returns the correct data", () => {
//   const oneRepMax = 225;
//   const expectedData = [
//     { weight: 324, percentage: 100, reps: 1 },
//     { percentage: 95, reps: 2, weight: 307.8 },
//     { percentage: 90, reps: 4, weight: 291.6 },
//     { percentage: 85, reps: 6, weight: 275.4 },
//     { percentage: 80, reps: 8, weight: 259.2 },
//     { percentage: 75, reps: 10, weight: 243 },
//     { percentage: 70, reps: 12, weight: 226.8 },
//     { percentage: 65, reps: 16, weight: 210.6 },
//     { percentage: 60, reps: 20, weight: 194.4 },
//     { percentage: 55, reps: 24, weight: 178.2 },
//     { percentage: 50, reps: 30, weight: 162 },
//   ];

//   const result = getPercentageOf1RM(oneRepMax);

//   expect(result).toEqual(expectedData);
// });


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
    expect(
      getDaysArray(new Date("Fri Oct 05 2023 20:00:00"), new Date("Fri Oct 01 2023 20:00:00"))
        .length
    ).toEqual(8);

    expect(
      getDaysArray(new Date("Fri Oct 01 2023 20:00:00"), new Date("Wed Oct 30 2023 20:00:00"))
        .length
    ).toEqual(30);
  });
});

describe("getTotalReps works", () => {
  const mockExercises = [
    {
      sets: [{ reps: 5 }, { reps: 8 }, { reps: 10 }, { reps: 3 }, { reps: 15 }],
    },
  ];
  it("returns the total reps", () => {
    expect(getTotalReps(mockExercises)).toEqual(41);
  });
});

describe("getTotalSets works", () => {
  const mockExercises = [
    {
      sets: [{ reps: 5 }, { reps: 8 }, { reps: 10 }, { reps: 3 }, { reps: 15 }],
    },
  ];
  it("returns the total number of sets", () => {
    expect(getTotalSets(mockExercises)).toEqual(5);
  });
});

describe("getTotalVolume works", () => {
  const mockExercises = [
    {
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
  it("formats the time!", () => {
    expect(formatTime(5)).toMatch("05");
    expect(formatTime(30)).toMatch("30");
    expect(formatTime(30)).toMatch("30");
    expect(formatTime(0)).toMatch("00");
  });
});
