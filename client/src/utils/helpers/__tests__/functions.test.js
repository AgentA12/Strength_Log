import {
  getOneRepMax,
  capitalizeFirstLetter,
  compareDatesByDay,
  getTotalVolume,
  formatTime,
  getTotalReps,
  getTotalSets,
  getDaysArray,
  getRangeOfDates,
  displayExercisesForTemplate,
  findFirstAndLastRange,
} from "../functions";

describe("getOneRepMax works correctly", () => {
  it("returns one rep max", () => {
    expect(getOneRepMax(225, 10)).toEqual(300);
    expect(getOneRepMax(315, 20)).toEqual(668);
    expect(getOneRepMax(315, 0)).toEqual(null);
    expect(getOneRepMax(0, 20)).toEqual(null);
    expect(getOneRepMax(0, 0)).toEqual(null);
  });
});

describe("capitalizeFirstLetter works correctly", () => {
  it("caps the first letter of a string", () => {
    expect(capitalizeFirstLetter("one")).toEqual("One");
    expect(capitalizeFirstLetter("one two")).toEqual("One two");
    expect(capitalizeFirstLetter("one two three")).toEqual("One two three");
  });
});

describe("compareDatesByDay works correctly", () => {
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

describe("getDaysArray works correctly", () => {
  it("returns the array of dates in specified range", () => {
    expect(
      getDaysArray("Fri Oct 05 2023 20:00:00", "Wed Oct 12 2023 20:00:00")
        .length
    ).toEqual(8);

    expect(
      getDaysArray("Fri Oct 01 2023 20:00:00", "Wed Oct 30 2023 20:00:00")
        .length
    ).toEqual(30);
  });
});

describe("getTotalReps functions correctly", () => {
  const mockExercises = [
    {
      sets: [{ reps: 5 }, { reps: 8 }, { reps: 10 }, { reps: 3 }, { reps: 15 }],
    },
  ];
  it("returns the total reps", () => {
    expect(getTotalReps(mockExercises)).toEqual(41);
  });
});

describe("getTotalSets functions as expected", () => {
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
