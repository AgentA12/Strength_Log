import dayjs from "dayjs";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (date) => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

const getOneRepMax = (weight, repetitions) => {
  if (weight <= 0) return "NA";
  const oneRepMax = weight / [1.0278 - 0.0278 * repetitions];

  return `${Math.round(oneRepMax * 10) / 10} Lbs`;
};

const compareDatesByDay = (firstDate, secondDate) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

function getRangeOfDates(range, firstDate, lastDate) {
  //depending on the range generate a range of dates

  switch (range) {
    case "Last 12 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(12, "month").$d),
        new Date(lastDate)
      );

    case "Last 6 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(6, "month").$d),
        new Date(lastDate)
      );

    case "Last 3 months":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(3, "month").$d),
        new Date(lastDate)
      );

    case "Last month":
      return getDaysArray(
        new Date(dayjs(lastDate).subtract(1, "month").$d),
        new Date(lastDate)
      );

    default:
      return getDaysArray(new Date(firstDate), new Date(lastDate));
  }
}

function getDaysArray(firstSavedExeciseDate, endDate) {
  for (
    var dateAry = [], currentDate = new Date(firstSavedExeciseDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    dateAry.push(new Date(currentDate));
  }
  return dateAry;
}

function checkIfSameDay(date1, date2) {
  return date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDay() === date2.getDay()
    ? true
    : false;
}

export {
  formatDate,
  getOneRepMax,
  capitalizeFirstLetter,
  compareDatesByDay,
  getDaysArray,
  getRangeOfDates,
  checkIfSameDay,
};
